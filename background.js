let isExtensionActive = false;

chrome.runtime.onInstalled.addListener(() => {
    // Initialize the extension state in storage
    chrome.storage.local.set({ isExtensionActive: false });

    // Set the initial badge text to "OFF"
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

// Create a listener so that the extension can be toggled on and off 
// and will persist across browser sessions and page reloads

// The listener will be called when the extension icon is clicked
chrome.action.onClicked.addListener(() => {
    isExtensionActive = !isExtensionActive;

    chrome.storage.local.set({ isExtensionActive });

    // Update the badge text to reflect the extension state
    chrome.action.setBadgeText({
        text: isExtensionActive ? "ON" : "OFF",
    });
});

// Create a listener for when the extension is active and the user navigates to a new page
// The listener will be called when the tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the extension is active
    chrome.storage.local.get("isExtensionActive", (data) => {
        if (data.isExtensionActive) {
            // If the extension is active, inject the CSS and JS into the page
            chrome.scripting.insertCSS({
                target: { tabId },
                files: ["focus-mode.css"],
            });
        }
        else {
            chrome.scripting.removeCSS({
                target: { tabId },
                files: ["focus-mode.css"],
            });
        }
    });
});