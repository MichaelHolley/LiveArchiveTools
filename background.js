const volumeSteps = 0.05;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ volumeSteps });
});