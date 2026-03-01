const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const speedCtrl = document.getElementById('speed');
const speedVal = document.getElementById('speedVal');

speedCtrl.addEventListener('input', (e) => {
    speedVal.textContent = parseFloat(e.target.value).toFixed(1);
});

playBtn.addEventListener('click', async () => {
    // Get current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute script to get selected text
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => window.getSelection().toString()
    }, (results) => {
        if (chrome.runtime.lastError || !results || !results[0]) return;

        const selection = results[0].result;
        if (selection) {
            chrome.tts.stop(); // Stop any current speech
            chrome.tts.speak(selection, {
                rate: parseFloat(speedCtrl.value)
            });
        }
    });
});

stopBtn.addEventListener('click', () => {
    chrome.tts.stop();
});
