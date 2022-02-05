const volumeSteps = 0.05;
const videoWatchedColor = '#02A348'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ volumeSteps });
  chrome.storage.sync.set({ videoWatchedColor });
});