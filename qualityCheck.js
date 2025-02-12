const clickButton = document.getElementById("Qcheck");

clickButton.addEventListener("click", function () {
    const isClick = clickButton.value || "default"; // Use a default value if not set
    chrome.storage.sync.set({ clickState: isClick }, () => {
        console.log("clickState updated to:", isClick);
    });
});