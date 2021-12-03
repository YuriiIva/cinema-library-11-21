import { Notify } from 'notiflix/build/notiflix-notify-aio';
import storage from './servises/localStorage.js';
import { WEB_LOCAL_WATCHED, WEB_LOCAL_QUEUE, TIME_OF_CONNECTION } from './servises/constants.js';
import userPic from '../img/film-interpretation.jpg';

import refs from './refs.js';

const getTime = storage.get(TIME_OF_CONNECTION);

let isUserInfoOpen = false;

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
  refs.userSection.classList.toggle('vusually-hidden');
  isUserInfoOpen = true;

  setTimeout(() => {
    refs.userInfo.innerHTML = '';
    refs.userSection.classList.toggle('vusually-hidden');
    isUserInfoOpen = false;
  }, 7000);
}

function onShowInfoByLs() {
  if (isUserInfoOpen) return false;
  renderMrkupInfo();
}

refs.showInfo.addEventListener('click', onShowInfoByLs);

function markupInfo() {
  const genres = sortAllGenres();

  return `
  <div class="wrapper-user-img"> <img class="user__img" src="${userPic}" alt="Look movie" /></div>
  <h3 class="user__title-inf"><span class="user__title--first">you</span> are the director of your novel ;) </h3>
  <table class="table table--user">
    <tbody class="table__body">
      <tr class="table__row">
        <td class="table__title">Amount of watched movies</td>
        <td class="table__text table__text--center votes--orange">${takeAmountInfoLs(
          WEB_LOCAL_WATCHED,
        )}</td>
      </tr>
      <tr class="table__row">
        <td class="table__title">Amount of queue movies</td>
        <td class="table__text table__text--center votes--orange">${takeAmountInfoLs(
          WEB_LOCAL_QUEUE,
        )}</td>
      </tr>
      <tr class="table__row">
        <td class="table__title">Time spent with me</td>
        <td class="table__text">${createDate(passedTime())}</td>
      </tr>
      <tr class="table__row">
        <td class="table__title">Registration date</td>
        <td class="table__text">${createFullDate(storage.get(TIME_OF_CONNECTION))}</td>
      </tr>
      <tr class="table__row">
        <td class="table__title">Current date</td>
        <td class="table__text">${createFullDate(Date.now())}</td>
      </tr>
    </tbody>
  </table>
  ${createMarkupTableGenres(genres)}
  `;
}

function createMarkupTableGenres(array) {
  if (array.length < 1) return '<p>Please, add films<p>';
  return `
  <p class="user__text">Your lovely genre: <span class="user__text-info">${array
    .slice(0, 3)
    .join(', ')}</span></p>`;
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
  return Object.entries(genres)
    .sort((a, b) => b[1] - a[1])
    .map(([genre, numb]) => genre);
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
