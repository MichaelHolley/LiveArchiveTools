var popularVideos = document.getElementsByClassName('video-item-popular');
var latestVideos = document.getElementsByClassName('video-item-latest');

var vodSettings = JSON.parse(localStorage.getItem("vod_player_settings"));
var positions = vodSettings.positions;

chrome.storage.sync.get('useViewedIndicator', ({ useViewedIndicator }) => {
  if (useViewedIndicator) {
    setViewed();
  }
});

var latestVideosDictionary = new Object();
function setViewed() {
  if (typeof latestVideos !== "undefined" && latestVideos.length > 0) {
    for (let lV of latestVideos) {
      latestVideosDictionary[getVideoIdByAnkerElement(lV)] = lV;
    }

    if (positions && Object.keys(positions).length > 0) {
      chrome.storage.sync.get('indicatorColor', ({ indicatorColor }) => {
        Object.keys(positions).forEach(key => {
          latestVideosDictionary[key].getElementsByClassName('video-item-views')[0].style.color = indicatorColor;

          for (let pV of popularVideos) {
            if (getVideoIdByAnkerElement(pV) === key) {
              pV.getElementsByClassName('video-item-views')[0].style.color = indicatorColor;
            }
          }
        });
      });
    }
  } else {
    console.log("Videos not yet loaded");
    setTimeout(setViewed, 250);
  }
}

function getVideoIdByAnkerElement(element) {
  return element.href.split('player?id=')[1];
}