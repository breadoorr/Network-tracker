// file for the counting successful requests

let successfulRequestCount = 0;

// listens for all the 200's requests
chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.statusCode >= 200 && details.statusCode < 300) {
            successfulRequestCount++;
            chrome.storage.local.set({ requestCount: successfulRequestCount });
        }
    },
    { urls: ["<all_urls>"] }
);

// resets the successful requests when new tab entered
chrome.tabs.onActivated.addListener(function(activeInfo) {
    successfulRequestCount = 0;
    chrome.storage.local.set({ requestCount: successfulRequestCount });
});

// same requests resetting when the page is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'loading') {
        successfulRequestCount = 0;
        chrome.storage.local.set({ requestCount: successfulRequestCount });
    }
});
