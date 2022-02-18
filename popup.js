/*
INPUTS
*/
const useVolumeWheelInput = document.getElementById('useVolumeWheel');
const volumeStepsInput = document.getElementById('volumeSteps');
const useViewedIndicatorInput = document.getElementById('useViewedIndicator');
const indicatorColorInput = document.getElementById('indicatorColor');

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
