import refs from './refs.js';

import {
  BASE_URL_IMG,
  FILE_SIZE,
  WEB_LOCAL_WATCHED,
  WEB_LOCAL_QUEUE,
} from './servises/constants.js';
import { getMovie } from './servises/api.js';
import { createMarkupInfoModal, createMarkupLs } from './render-markup.js';
import storage from './servises/localStorage.js';
import { resetGallery } from './switch-page.js';

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

function onClickWorkWithData(e) {
  if (e.target.tagName !== 'BUTTON') return false;

  const btn = e.target;

  const objData = JSON.parse(e.currentTarget.dataset.data);

  if (btn.dataset.add === 'watched') {
    workWithLocalStor(WEB_LOCAL_WATCHED, btn, objData, objData.id);
    return;
  }

  if (btn.dataset.add === 'queue') {
    workWithLocalStor(WEB_LOCAL_QUEUE, btn, objData, objData.id);
    return;
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
      refs.modalInfo.dataset.data = JSON.stringify(createObj(movie));
    })
    .catch(console.log);
}

refs.modalInfo.addEventListener('click', onClickWorkWithData);

refs.ulGallery.addEventListener('click', onShowModalWithInfoMovie);

const findItemById = (array, id) => array.find(item => item.id === id);

function workWithLocalStor(key, btn, obj, id) {
  let data = storage.get(key) || [];

  if (data.length >= 1 && findItemById(data, id)) {
    storage.deleteArrayItemFromStorage(key, id);
    chechedText(btn, key, true);
    return false;
  }

  storage.saveArrayItemToStorage(key, obj);
  chechedText(btn, key, false);
}

function chechedText(btn, key, boolean) {
  if (key === WEB_LOCAL_WATCHED) {
    btn.textContent = boolean ? 'add to Watched' : 'remove from Watched';
    return false;
  }
  if (key === WEB_LOCAL_QUEUE) {
    btn.textContent = boolean ? 'add to queue' : 'remove from queue';
    return false;
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
  refs.modalInfo.innerHTML = '';
  document.body.classList.add('show-modal', 'no-scroll');
}

function onModalClose() {
  renderLsMarkupListByActive();

  document.body.classList.remove('show-modal', 'no-scroll');
}

window.addEventListener('keydown', onEscKeyDown);

function onEscKeyDown(e) {
  console.log(e);
  if (e.code === 'Escape') {
    onModalClose();
  }
}

const preparationGenres = array => array.map(({ name }) => name).join(', ');
export { findItemById, preparationGenres };

function renderLsMarkupListByActive() {
  if (refs.heroLib.classList.contains('vusually-hidden')) return false;

  if (refs.watchedBtn.classList.contains('hero__btn-active')) {
    chackIdLsForRender(WEB_LOCAL_WATCHED);
    let data = storage.get(WEB_LOCAL_WATCHED); 
    if (data.length < 1) {
      refs.noFilm.classList.remove("vusually-hidden");
    }
  }

  if (refs.queueBtn.classList.contains('hero__btn-active')) {
    chackIdLsForRender(WEB_LOCAL_QUEUE);
    let data = storage.get(WEB_LOCAL_QUEUE); 
    if (data.length < 1) {
      refs.noFilmQ.classList.remove("vusually-hidden");
    }
  }

}

function chackIdLsForRender(key) {
  let data = storage.get(key);

  if (!data) {
    return false;
  }

  if (!findItemById(data, data.id)) {
    resetGallery();
    refs.ulGallery.innerHTML = createMarkupLs(data);
  }
}
