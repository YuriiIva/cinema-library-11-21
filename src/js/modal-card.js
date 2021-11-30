import refs from './refs.js';

import {
  BASE_URL_IMG,
  FILE_SIZE,
  WEB_LOCAL_WATCHED,
  WEB_LOCAL_QUEUE,
} from './servises/constants.js';
import { getMovie } from './servises/api.js';
import { createMarkupInfoModal } from './render-markup.js';
import storage from './servises/localStorage.js';

function createObj(data) {
  const { original_title, genres, vote_average, release_date, poster_path, id } = data;

  return {
    id,
    title: original_title,
    poster: `${BASE_URL_IMG + FILE_SIZE + poster_path}`,
    genres: `${preparationGenres(genres)}`,
    average: vote_average,
    releaseDate: new Date(release_date).getFullYear(),
  };
}

function renderMarkupInfoModal(data) {
  refs.modalInfo.innerHTML = createMarkupInfoModal(data);
}

function onClickWorkWithData(e, data) {
  if (e.target.tagName !== 'BUTTON') return false;

  const btn = e.target;

  const objData = createObj(data);

  if (btn.dataset.add === 'watched') {
    workWithLocalStor(WEB_LOCAL_WATCHED, btn, objData, objData.id);
  }

  if (btn.dataset.add === 'queue') {
    workWithLocalStor(WEB_LOCAL_QUEUE, btn, objData, objData.id);
  }
}

function onShowModalWithInfoMovie(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) return false;

  isModalOpen();

  const id = e.target.closest('li').dataset.id;

  getMovie(id)
    .then(movie => {
      renderMarkupInfoModal(movie);
      refs.modalInfo.addEventListener('click', elem => onClickWorkWithData(elem, movie));
    })
    .catch(console.log);
}

refs.ulGallery.addEventListener('click', onShowModalWithInfoMovie);

const findItemById = (array, id) => array.find(item => item.id === id);

function workWithLocalStor(key, btn, obj, id) {
  let data = storage.get(key) || [];

  if (data.length >= 1 && findItemById(data, id)) {
    storage.deleteArrayItemFromStorage(key, id);
    chechedText(btn, key, true);
    return;
  }

  storage.saveArrayItemToStorage(key, obj);
  chechedText(btn, key, false);
}

function chechedText(btn, key, boolean) {
  if (key === WEB_LOCAL_WATCHED) {
    btn.textContent = boolean ? 'add to Watched' : 'remove from Watched';
  }
  if (key === WEB_LOCAL_QUEUE) {
    btn.textContent = boolean ? 'add to queue' : 'remove from queue';
  }
}

refs.closeModalBtn.addEventListener('click', onModalClose);
refs.backdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onModalClose();
  }
}

function isModalOpen() {
  window.addEventListener('keydown', onEscKeyDown);
  document.body.classList.add('show-modal', 'no-scroll');
}

function onModalClose() {
  refs.modalInfo.innerHTML = '';
  window.removeEventListener('keydown', onEscKeyDown);
  document.body.classList.remove('show-modal', 'no-scroll');
}

function onEscKeyDown(e) {
  if (e.code === 'Escape') {
    onModalClose();
  }
}
const preparationGenres = array => array.map(({ name }) => name).join(', ');
export { findItemById, preparationGenres };
