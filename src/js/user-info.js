import { Notify } from 'notiflix/build/notiflix-notify-aio';
import storage from './servises/localStorage.js';
import { WEB_LOCAL_WATCHED, WEB_LOCAL_QUEUE, TIME_OF_CONNECTION } from './servises/constants.js';

import refs from './refs.js';

const getTime = storage.get(TIME_OF_CONNECTION);

firstLoginTime();

function firstLoginTime() {
  if (getTime) return false;
  storage.save(TIME_OF_CONNECTION, Date.now());
}

const passedTime = () => Date.now() - storage.get(TIME_OF_CONNECTION);

function takeAmountInfoLs(key) {
  let data = storage.get(key) || [];
  if (data.length < 1) {
    if (key === WEB_LOCAL_WATCHED) {
      Notify.info('I know you have great taste, add your films to the list of watched.', {
        timeout: 3000,
      });
    }

    if (key === WEB_LOCAL_QUEUE) {
      Notify.info(
        `We have an extensive library, I'm sure there will be something that will be interesting to see`,
        {
          timeout: 4500,
        },
      );
    }

    return 0;
  }
  return data.length;
}

function renderMrkupInfo() {
  refs.userInfo.innerHTML = markupInfo();
  // setTimeout(() => (refs.userInfo.innerHTML = ''), 7000);
}

function onShowInfoByLs() {
  renderMrkupInfo();
}

refs.showInfo.addEventListener('click', onShowInfoByLs);

function markupInfo() {
  const genres = sortAllGenres();

  return `<h2 class="user__title">User Info</h2>
  <table class="table table--user">
    <tbody class="table__body">
    <tr class="table__row">
        <td class="table__title">Registration date</td>
        <td class="table__text">${createFullDate(storage.get(TIME_OF_CONNECTION))}</td>
      </tr>
      <tr class="table__row">
        <td class="table__title">Date now</td>
        <td class="table__text">${createFullDate(Date.now())}</td>
      </tr>
      <tr class="table__row">
        <td class="table__title">Time spent with me</td>
        <td class="table__text">${createDate(passedTime())}</td>
      </tr>
      <tr class="table__row">
        <td class="table__title">Info about list watched</td>
        <td class="table__text table__text-vote">${takeAmountInfoLs(WEB_LOCAL_WATCHED)}</td>
      </tr>
      <tr class="table__row">
        <td class="table__title">Info about list queue</td>
        <td class="table__text table__text-vote">${takeAmountInfoLs(WEB_LOCAL_QUEUE)}</td>
      </tr>
    </tbody>
  </table>
  ${createMarkupTableGenres(genres)}
  `;
}

function createMarkupTableGenres(array) {
  if (array.length < 1) return '<p>Please, add films<p>';
  return `<table class="table table--genres">
    <thead class="table__head">
      <th class="table__head-text">Genres</th>
      <th class="table__head-text">Amount</th>
    </thead>
    <tbody class="table__body">
      ${createMarkupUserInfo(array)}
    </tbody>
  </table>
  <p class="user__text">Your lovely genre - <span class="user__text-info">${
    array[0][0]
  }</span></p>`;
}

const createDate = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, '0');

  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, '0');

  return `${days}:${hours}:${minutes}:${seconds}`;
};

const createFullDate = dateInfo => {
  const date = new Date(dateInfo);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minuts = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${day}.${month}.${year}  ${hours}:${minuts}:${seconds}`;
};

function sortAllGenres() {
  const arrayWatchedLs = storage.get(WEB_LOCAL_WATCHED) || [];
  const arrayQueueLs = storage.get(WEB_LOCAL_WATCHED) || [];
  const array = [...arrayWatchedLs, ...arrayQueueLs];
  const allGenres = array.reduce((acc, item) => [...acc, ...item.genres.split(', ')], []);
  const genres = allGenres.reduce(
    (acc, tag) => ({
      ...acc,
      [tag]: acc[tag] ? acc[tag] + 1 : 1,
    }),
    {},
  );
  return Object.entries(genres).sort((a, b) => b[1] - a[1]);
}

const createMarkupUserInfo = array =>
  array
    .map(
      ([genre, amount]) => `<tr class="table__row">
        <td class="table__title">${genre}</td>
        <td class="table__text">${amount}</td>
      </tr>`,
    )
    .join('');
