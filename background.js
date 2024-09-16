chrome.action.onClicked.addListener((tab) => {
    if (tab.url && tab.url.includes('web.whatsapp.com')) {
        chrome.tabs.create({ url: 'manage_recommendations.html' });
    } else {
        chrome.tabs.create({ url: 'https://web.whatsapp.com' });
    }
});