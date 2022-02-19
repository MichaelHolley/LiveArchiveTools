/*
VIDEO-PLAYER
*/
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

/*
CHAT
*/
const chatMessagesContainer = document.getElementById('chatmessages');
// Options for the observer (which mutations to observe)
var config = { attributes: false, childList: true, subtree: false };

// Callback function to execute when mutations are observed
var mutationCallback = function (mutationsList, observer) {
  for (var mutation of mutationsList) {
    if (mutation.type == 'childList') {
      chrome.storage.sync.get('hideTimestamps', ({ hideTimestamps }) => {
        if (hideTimestamps) {
          let messages = document.getElementsByClassName('chatmessage');

          for (let m of messages) {
            m.style.marginLeft = '0px';

            let timedisplay = m.getElementsByClassName('pinlinetime')[0];
            if (!!timedisplay) {
              timedisplay.remove();
            }
          }
        }
      });
    }
  }
}

// Create an observer instance linked to the callback function
var observer = new MutationObserver(mutationCallback);

// Start observing the target node for configured mutations
observer.observe(chatMessagesContainer, config);

