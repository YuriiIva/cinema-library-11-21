import storage from './servises/localStorage.js';
import { getMovieById } from './movieGenres';

import {
  WEB_LOCAL_WATCHED,
  WEB_LOCAL_QUEUE,
  BASE_URL_IMG,
  FILE_SIZE,
} from './servises/constants.js';

import { findItemById, preparationGenres } from './modal-card.js';

const checkInfoLsW = id => {
  const data = storage.get(WEB_LOCAL_WATCHED) || [];
  return findItemById(data, id) ? 'remove from watched' : 'add to watched';
};

const checkInfoLsQ = id => {
  const data = storage.get(WEB_LOCAL_QUEUE) || [];
  return findItemById(data, id) ? 'remove from queue' : 'add to queue';
};

function createMarkupInfoModal({
  id,
  vote_average,
  vote_count,
  popularity,
  original_title,
  title,
  genres,
  overview,
  poster_path,
}) {
  const url = poster_path
    ? `${BASE_URL_IMG + FILE_SIZE + poster_path}`
    : '../img/default-foto/filmoteka.jpg';
  console.log('🚀 ~ url', url);
  return `<div class="wrapper-poster">
        <img class="modal-info__img" src=${url} alt="${title}" />
        <button class="btn__trailer--hidden" type="button" data-trailer="trailer"></button>
      </div>
      <div class="wrapper-info">
        <h3 class="modal-info__title">${original_title}</h3>
        <table class="table">
          <tbody class="table__body">
            <tr class="table__row">
              <td class="table__title">Vote / Votes</td>
              <td class="table__text"><span class="table__text-vote">${vote_average}</span><span class="votes">${vote_count}</span></td>
            </tr>
            <tr class="table__row">
              <td class="table__title">Popularity</td>
              <td class="table__text">${popularity.toFixed(1)}</td>
            </tr>
            <tr class="table__row">
              <td class="table__title">Original Title</td>
              <td class="table__text--uppercase">${original_title}</td>
            </tr>
            <tr class="table__row">
              <td class="table__title">Genre</td>
              <td class="table__text">${preparationGenres(genres)}</td>
            </tr>
          </tbody>
        </table>
        <p class="modal-info__title-text">About</p>
        <p class="modal-info__text">${overview}</p>
        <div class="wrapper-btn">
        <button class="modal-info__btn--watched" type="button" data-add="watched">${checkInfoLsW(
          id,
        )}</button>
        <button class="modal-info__btn--queue" type="button" data-add="queue">${checkInfoLsQ(
          id,
        )}</button>
        </div>
      </div>`;
}

const createMarkup = data => {
  return data
    .map(({ poster_path, original_title, genre_ids, release_date, id }) => {
      const genresId = genre_ids.length <= 2 ? genre_ids : genre_ids.slice(0, 2);
      const genres = genresId.map(id => getMovieById(id)).join(', ');
      const date = new Date(release_date).getFullYear();
      console.log('poster_path', poster_path);
      const url = poster_path
        ? `${BASE_URL_IMG + FILE_SIZE}${poster_path}`
        : '../img/default-foto/Filmoteka.jpg';
      return `
<li data-id="${id}" class="gallery__item">
<div class="gallery__wrapper-img"><img src="${url}" alt="${original_title}"></div>
<div class="gallery__info">
<p class="gallery__info-name">${original_title}</p>
<p class="gallery__information">${genres}|${date}</p>
</div>
</li>
</ul>`;
    })
    .join('');
};

const createMarkupLs = dataLs => {
  return dataLs
    .map(
      ({ poster, title, genres, releaseDate, id, average }) => `
   <li data-id="${id}" class="gallery__item">
<div class="gallery__wrapper-img"><img src="${poster}" alt="${title}"></div>
<div class="gallery__info">
<p class="gallery__info-name">${title}</p>
<p class="gallery__information">${genres}|${releaseDate}<span class="gallery__rating">${average}</span></p>
</div>
</li> `,
    )
    .join('');
};

export { createMarkup, createMarkupLs, createMarkupInfoModal };
