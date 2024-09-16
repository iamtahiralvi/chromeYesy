let recommendations = [];

function loadRecommendations() {
    chrome.storage.sync.get(['recommendations'], function(result) {
        recommendations = result.recommendations || [];
        displayRecommendations();
    });
}

function saveRecommendations() {
    chrome.storage.sync.set({recommendations: recommendations}, function() {
        console.log('Recommendations saved');
    });
}

function displayRecommendations() {
    const container = document.getElementById('recommendations');
    container.innerHTML = '';
    recommendations.forEach((rec, index) => {
        const div = document.createElement('div');
        div.className = 'recommendation';
        div.innerHTML = `
            <span>${rec}</span>
            <button class="delete-button">Delete</button>
        `;
        div.querySelector('.delete-button').onclick = () => deleteRecommendation(index);
        container.appendChild(div);
    });
}

function addRecommendation() {
    const input = document.getElementById('newRecommendation');
    const recommendation = input.value.trim();
    if (recommendation) {
        recommendations.push(recommendation);
        saveRecommendations();
        displayRecommendations();
        input.value = '';
    }
}

function deleteRecommendation(index) {
    recommendations.splice(index, 1);
    saveRecommendations();
    displayRecommendations();
}

document.getElementById('addRecommendation').addEventListener('click', addRecommendation);
loadRecommendations();