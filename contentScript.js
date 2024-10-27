// Create and style the floating request counter
const counterDiv = document.createElement('div');
counterDiv.id = 'networkRequestCounter';
counterDiv.style.position = 'fixed';
counterDiv.style.bottom = '10px';
counterDiv.style.right = '10px';
counterDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
counterDiv.style.color = 'white';
counterDiv.style.padding = '10px';
counterDiv.style.borderRadius = '5px';
counterDiv.style.zIndex = '10000';
counterDiv.style.fontSize = '16px';
counterDiv.textContent = 'Requests: 0';
document.body.appendChild(counterDiv);

// Listen for updates from the background script
chrome.storage.local.get('requestCount', function(data) {
    counterDiv.textContent = `Requests: ${data.requestCount || 0}`;
});

// Update the counter when storage changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.requestCount) {
        counterDiv.textContent = `Requests: ${changes.requestCount.newValue}`;
    }
});
