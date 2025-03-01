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

        chrome.storage.sync.get("toggleState", (data) => {
            if (chrome.runtime.lastError) {
                console.error("Error retrieving toggle state from storage:", chrome.runtime.lastError.message);
                return;
            }

            if (data && typeof data.toggleState !== 'undefined') {
                console.log("Toggle State Data:", data.toggleState);
            } else {
                console.warn("toggleState is not set in storage.");
            }
        });
        
    }
});

const commandFunctions = {
    'show_link_checker': messageshow,
    'scoping_information': scoping_display,
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
        chrome.tabs.sendMessage(tabs[0].id, { action: "show" });
    });
}

function scoping_display() {    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scoping" });
    });
}
