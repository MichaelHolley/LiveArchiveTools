var playerWrapper = document.getElementsByClassName('player-wrapper')[0];
var playerDiv = document.getElementById('videoPlayer');
var videoPlayer = document.getElementsByTagName('video')[0];

var volumeLevelDisplay = document.createElement("div");
volumeLevelDisplay.id = 'volumeLevelDisplay';
volumeLevelDisplay.style.display = 'block';
volumeLevelDisplay.style.position = 'absolute';
volumeLevelDisplay.style.top = '0';
volumeLevelDisplay.style.left = '20px';
volumeLevelDisplay.style.marginTop = '20px';
volumeLevelDisplay.style.color = 'white';
volumeLevelDisplay.style.transition = 'opacity 0.5s ease-in-out'
playerWrapper.appendChild(volumeLevelDisplay);
var volumeLevelDisplayTimeout;

playerDiv.addEventListener('wheel', (e) => {
  handleWheelEvent(e);
});

function handleWheelEvent(e) {
  chrome.storage.sync.get('useVolumeWheel', ({ useVolumeWheel }) => {
    if (useVolumeWheel === true) {
      chrome.storage.sync.get('volumeSteps', ({ volumeSteps }) => {
        if (e.deltaY < 0) {
          videoPlayer.volume = videoPlayer.volume + volumeSteps <= 1 ? videoPlayer.volume + volumeSteps : 1;
        } else {
          videoPlayer.volume = videoPlayer.volume - volumeSteps >= 0 ? videoPlayer.volume - volumeSteps : 0;
        }

        displayVolumeLevel(videoPlayer.volume);
      });
    }
  });
}

displayVolumeLevel = (volume) => {
  volumeLevelDisplay.innerText = Math.round(volume * 100);
  volumeLevelDisplay.style.opacity = '100%';

  clearTimeout(volumeLevelDisplayTimeout);
  volumeLevelDisplayTimeout = setTimeout(hideVolumeLevel, 1000);
}

hideVolumeLevel = () => {
  volumeLevelDisplay.style.opacity = '0%';
}