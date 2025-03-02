chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {

        let popupFile = "";
        
        if (/^https:\/\/webbuilder\.localsearch\.com\.au\/home\/site\//.test(tab.url)) {
            popupFile = "";
        } else 
        if (/^https:\/\/webbuilder\.localsearch\.com\.au\/site\//.test(tab.url)) {
            popupFile = "preview.html";
        } else 
        if (/^https:\/\/.*\.webbuilder\.localsearch\.com\.au\//.test(tab.url)) {
            popupFile = "";
        // } else 
        // if (/^https:\/\/lsearch\.lightning\.force\.com\/lightning\//.test(tab.url)) {
        //     popupFile = "salesforce.html";
        }

        chrome.action.setPopup({ tabId: tabId, popup: popupFile });

        chrome.storage.sync.get("keyState", (data) => {
            if (chrome.runtime.lastError) {
                console.error("Error retrieving toggle state from storage:", chrome.runtime.lastError.message);
                return;
            }

            if (data && typeof data.keyState !== 'undefined') {
                console.log("Key State Data:", data.keyState);
            } else {
                console.warn("keyState is not set in storage.");
            }
        });
        
    }
});

// hotkeys function
const commandFunctions = {
    'show_link_checker': messageshow,
    'scoping_information': scoping_display,
    // Add more command-function pairs here
};

chrome.commands.onCommand.addListener(function (command) {
    if (commandFunctions[command]) {
        commandFunctions[command]();
    } else {
        console.log(`Command ${command} not found`);
    }
});

function messageshow() {
     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.storage.sync.get("keyState", (data) => {
            if(data.keyState === "show") {
                chrome.storage.sync.set({ keyState: "hide" });
                chrome.tabs.sendMessage(tabs[0].id, { action: "hide" });
            } else {
                chrome.storage.sync.set({ keyState: "show" });
                chrome.tabs.sendMessage(tabs[0].id, { action: "show" });
            }
        });
    });
}

function scoping_display() {    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scoping" });
    });
}
