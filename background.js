const useVolumeWheel = true;
const volumeSteps = 0.05;
const useViewedIndicator = true;
const indicatorColor = '#02A348';
const hideTimestamps = true;
const blurVideoImages = false;
const hidePopularVideos = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ useVolumeWheel });
  chrome.storage.sync.set({ volumeSteps });
  chrome.storage.sync.set({ useViewedIndicator });
  chrome.storage.sync.set({ indicatorColor });
  chrome.storage.sync.set({ hideTimestamps });
  chrome.storage.sync.set({ blurVideoImages });
  chrome.storage.sync.set({ hidePopularVideos });
});