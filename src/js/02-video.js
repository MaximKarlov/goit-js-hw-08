const _ = require('lodash');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const errorMessage = 'please wait... Dont edit this code.';
if (localStorage.getItem('videoplayer-current-time')) {
  player.setVolume(0.5);
  const seconds = localStorage.getItem('videoplayer-current-time');
  player.setCurrentTime(seconds - 2);
}

const throt_fun = _.throttle(function () {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem('videoplayer-current-time', seconds | 0);
      console.log('saved seconds: ', seconds | 0);
      // seconds = the current playback position
    })
    .catch(function (error) {
      // an error occurred
      console.log(error);
    });
}, 1000);

player.on('timeupdate', throt_fun);
player.on('timeupdate', function (data) {
  localStorage.setItem('seconds-current-time', data.seconds);
  console.log('true seconds: ', data.seconds);
});
