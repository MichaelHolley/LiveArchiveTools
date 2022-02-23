/*
INPUTS
*/
const useVolumeWheelInput = document.getElementById('useVolumeWheel');
const volumeStepsInput = document.getElementById('volumeSteps');
const useViewedIndicatorInput = document.getElementById('useViewedIndicator');
const indicatorColorInput = document.getElementById('indicatorColor');
const hideTimestampsInput = document.getElementById('hideTimestamps');
const blurVideoImagesInput = document.getElementById('blurVideoImages');

/*
INITIAL VALUES
*/
chrome.storage.sync.get('useVolumeWheel', ({ useVolumeWheel }) => {
  useVolumeWheelInput.checked = useVolumeWheel;
});

chrome.storage.sync.get('useViewedIndicator', ({ useViewedIndicator }) => {
  useViewedIndicatorInput.checked = useViewedIndicator;
});

chrome.storage.sync.get('volumeSteps', ({ volumeSteps }) => {
  volumeStepsInput.value = volumeSteps * 100;
});

chrome.storage.sync.get('indicatorColor', ({ indicatorColor }) => {
  indicatorColorInput.value = indicatorColor;
});

chrome.storage.sync.get('hideTimestamps', ({ hideTimestamps }) => {
  hideTimestampsInput.checked = hideTimestamps;
});

chrome.storage.sync.get('blurVideoImages', ({ blurVideoImages }) => {
  blurVideoImagesInput.checked = blurVideoImages;
});

/*
LISTENERS
*/
useVolumeWheelInput.addEventListener('change', (e) => {
  chrome.storage.sync.set({ useVolumeWheel: e.target.checked });
});

volumeStepsInput.addEventListener('change', (e) => {
  chrome.storage.sync.set({ volumeSteps: parseInt(e.target.value) / 100 });
});

useViewedIndicator.addEventListener('change', (e) => {
  chrome.storage.sync.set({ useViewedIndicator: e.target.checked });
});

indicatorColorInput.addEventListener('change', (e) => {
  chrome.storage.sync.set({ indicatorColor: e.target.value });
});

hideTimestampsInput.addEventListener('change', (e) => {
  chrome.storage.sync.set({ hideTimestamps: e.target.checked });
});

blurVideoImagesInput.addEventListener('change', (e) => {
  console.log(e.target.checked);
  chrome.storage.sync.set({ blurVideoImages: e.target.checked });
});
