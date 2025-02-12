// const CheckToggle = document.getElementById("toggleCheck");
const toggleCheckbox = document.getElementById("toggleLinks");

chrome.storage.sync.get("toggleState", (data) => {
    toggleCheckbox.checked = data.toggleState || false;
    sendToggleState(toggleCheckbox.checked);
});

toggleCheckbox.addEventListener("change", function () {
    const isChecked = this.checked;

    chrome.storage.sync.set({ toggleState: isChecked });

    sendToggleState(isChecked);
});

// chrome.storage.sync.get("CheckToggle", (data) => {
//     CheckToggle.checked = data.toggleState || false;
//     CheckToggleState(CheckToggle.checked);
// });

// CheckToggle.addEventListener("change", function () {
//     const isChecked = this.checked;

//     chrome.storage.sync.set({ toggleState: isChecked });

//     CheckToggleState(isChecked);
// });

function sendToggleState(isChecked) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: isChecked ? "show" : "hide" });
    });
}

// function CheckToggleState(isChecked) {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, { action: isChecked ? "show" : "hide" });
//     });
// }