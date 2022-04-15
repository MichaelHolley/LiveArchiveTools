var popularVideos = document.getElementsByClassName('video-item-popular');
var latestVideos = document.getElementsByClassName('video-item-latest');

var vodSettings = JSON.parse(localStorage.getItem("vod_player_settings"));
var positions = vodSettings ? vodSettings.positions : undefined;

const cycleTime = 100;

/*
VIEWED-INDICATOR
*/
function getVideoIdByAnkerElement(element) {
  return element.href.split('player?id=')[1];
}

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
    setTimeout(setViewed, cycleTime);
  }
}


/*
BLUR PREVIEW-IMAGES
*/
chrome.storage.sync.get('blurVideoImages', ({ blurVideoImages }) => {
  if (blurVideoImages) {
    setBlurred();
  }
});

function setBlurred() {
  if (typeof latestVideos !== "undefined" && latestVideos.length > 0) {
    let previews = document.getElementsByClassName("video-image");
    for (let img of previews) {
      img.style.filter = 'blur(5px)'
    }
  } else {
    setTimeout(setBlurred, cycleTime);
  }
}

/*
HIDE POPULAR VIDEOS
*/
chrome.storage.sync.get('hidePopularVideos', ({ hidePopularVideos }) => {
  if (hidePopularVideos) {
    let popularHeader = document.getElementsByClassName('h2-black title-left')[0];
    popularHeader.remove();

    let popularList = document.getElementById('video-list-popular');
    popularList.parentElement.remove();

    let latestList = document.getElementById('video-latest');
    latestList.style.marginTop = '0px'
  }
});