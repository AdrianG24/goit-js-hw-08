import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_TIME = 'videoplayer-current-time';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
if (localStorage.getItem(STORAGE_TIME)) {
  player.setCurrentTime(load(STORAGE_TIME));
}

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    save(STORAGE_TIME, seconds);
  }, 1000)
);
