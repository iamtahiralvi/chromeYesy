// Dummy recommendations
const dummyRecommendations = [
  "Thanks for your message!",
  "I'll get back to you soon.",
  "That's interesting!",
  "Could you please provide more details?",
  "I appreciate your input."
];

// Function to get a random recommendation
function getRandomRecommendation() {
  return dummyRecommendations[Math.floor(Math.random() * dummyRecommendations.length)];
}

// Function to create and insert the overlay
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'whatsapp-recommender-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 280px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    z-index: 1000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    overflow: hidden;
    transition: all 0.3s ease;
    display: none;
  `;

  const header = document.createElement('div');
  header.id = 'whatsapp-recommender-header';
  header.textContent = 'Reply Recommendations';
  header.style.cssText = `
    background-color: #00a884;
    color: white;
    padding: 12px 16px;
    font-weight: bold;
    font-size: 16px;
    border-bottom: 1px solid #008f6f;
    cursor: move;
    user-select: none;
  `;

  const closeButton = document.createElement('button');
  closeButton.textContent = '✕';
  closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
  `;
  closeButton.onclick = closeRecommendations;

  const content = document.createElement('div');
  content.id = 'whatsapp-recommender-content';
  content.style.cssText = `
    padding: 12px;
    max-height: 300px;
    overflow-y: auto;
  `;

  header.appendChild(closeButton);
  overlay.appendChild(header);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  const button = document.createElement('div');
  button.id = 'whatsapp-recommender-button';
  button.innerHTML = '<span class="button-icon">💡</span><span class="button-text">Get Recommendations</span><span class="collapse-icon">◀</span>';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #00a884;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    user-select: none;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  `;

  const buttonIcon = button.querySelector('.button-icon');
  const buttonText = button.querySelector('.button-text');
  const collapseIcon = button.querySelector('.collapse-icon');
  
  buttonIcon.style.marginRight = '8px';
  collapseIcon.style.cssText = `
    margin-left: 10px;
    font-size: 12px;
    transition: transform 0.3s ease;
  `;
  
  let isCollapsed = false;
  
  collapseIcon.onclick = (e) => {
    e.stopPropagation();
    isCollapsed = !isCollapsed;
    if (isCollapsed) {
      buttonText.style.display = 'none';
      button.style.padding = '15px';
      button.style.borderRadius = '50%';
      collapseIcon.style.transform = 'rotate(180deg)';
      collapseIcon.style.marginLeft = '8px';
    } else {
      buttonText.style.display = 'inline';
      button.style.padding = '12px 20px';
      button.style.borderRadius = '5px';
      collapseIcon.style.transform = 'rotate(0deg)';
      collapseIcon.style.marginLeft = '10px';
    }
  };
  
  button.onclick = (e) => {
    if (e.target !== collapseIcon) {
      showRecommendations();
    }
  };
  
  document.body.appendChild(button);

  makeDraggable(overlay, header);
}

function makeDraggable(element, handle) {
  let isDragging = false;
  let startX, startY, startLeft, startTop;

  handle.addEventListener('mousedown', startDragging);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);

  function startDragging(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = element.offsetLeft;
    startTop = element.offsetTop;
    element.style.transition = 'none';
    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    element.style.left = `${startLeft + dx}px`;
    element.style.top = `${startTop + dy}px`;
  }

  function stopDragging() {
    isDragging = false;
    element.style.transition = 'all 0.3s ease';
  }
}

function showRecommendations() {
  const overlay = document.getElementById('whatsapp-recommender-overlay');
  const content = document.getElementById('whatsapp-recommender-content');
  const button = document.getElementById('whatsapp-recommender-button');
  content.innerHTML = '';
  overlay.style.display = 'block';
  button.style.display = 'none';

  for (let i = 0; i < 6; i++) {
    addRecommendation(getRandomRecommendation());
  }
}

function closeRecommendations() {
  const overlay = document.getElementById('whatsapp-recommender-overlay');
  const button = document.getElementById('whatsapp-recommender-button');
  overlay.style.display = 'none';
  button.style.display = 'flex';
}

function addRecommendation(recommendation) {
  const content = document.getElementById('whatsapp-recommender-content');
  const recDiv = document.createElement('div');
  recDiv.textContent = recommendation;
  recDiv.style.cssText = `
    background-color: #dcf8c6;
    color: #000000;
    padding: 10px 12px;
    margin-bottom: 8px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  `;
  recDiv.onmouseover = () => recDiv.style.backgroundColor = '#c7f1b3';
  recDiv.onmouseout = () => recDiv.style.backgroundColor = '#dcf8c6';
  recDiv.onclick = () => {
    const inputBox = findMessageInputBox();
    if (inputBox) {
      inputBox.focus();
      document.execCommand('insertText', false, recommendation);
      inputBox.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };
  content.appendChild(recDiv);

  while (content.children.length > 6) {
    content.removeChild(content.firstChild);
  }
}

function findMessageInputBox() {
  const selectors = [
    'div[contenteditable="true"][data-tab="10"]',
    'div[contenteditable="true"][data-tab="1"]',
    'div[contenteditable="true"][spellcheck="true"]',
    'div[contenteditable="true"]',
    'div[role="textbox"]'
  ];

  for (let selector of selectors) {
    const inputBox = document.querySelector(selector);
    if (inputBox) return inputBox;
  }

  return null;
}

function waitForChat() {
  const maxAttempts = 60;
  let attempts = 0;

  const chatInterval = setInterval(() => {
    if (document.querySelector('#main')) {
      clearInterval(chatInterval);
      console.log('WhatsApp Reply Recommender: Chat loaded');
      createOverlay();
    } else if (++attempts >= maxAttempts) {
      clearInterval(chatInterval);
      console.log('WhatsApp Reply Recommender: Failed to load chat');
    }
  }, 1000);
}

console.log('WhatsApp Reply Recommender: Extension loaded');
waitForChat();

// Replace the dummyRecommendations array and getRandomRecommendation function with:

let storedRecommendations = [];

function loadRecommendations() {
    chrome.storage.sync.get(['recommendations'], function(result) {
        storedRecommendations = result.recommendations || dummyRecommendations;
    });
}

function getRandomRecommendation() {
    return storedRecommendations[Math.floor(Math.random() * storedRecommendations.length)];
}

// Add this line at the end of the file:
loadRecommendations();