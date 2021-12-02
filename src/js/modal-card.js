import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs.js';

import { WEB_LOCAL_WATCHED, WEB_LOCAL_QUEUE } from './servises/constants.js';
import { getMovie } from './servises/api.js';
import { createMarkupInfoModal, createMarkupLs, makeLinkPic } from './render-markup.js';
import storage from './servises/localStorage.js';
import { resetGallery } from './switch-page.js';

let instance = null;

function createObj(data) {
  const { original_title, genres, vote_average, release_date, poster_path, id } = data;

  return {
    id,
    title: original_title,
    poster: `${makeLinkPic(poster_path)}`,
    genres: `${preparationGenres(genres)}`,
    average: vote_average,
    releaseDate: new Date(release_date).getFullYear(),
  };
}

const preparationGenres = array =>
  array
    .map(({ name }) => name)
    .slice(0, 2)
    .join(', ');

function onClickWorkWithData(e) {
  if (e.target.tagName !== 'BUTTON') return false;

  const btn = e.target;

  try {
    const objData = JSON.parse(e.currentTarget.dataset.data);
    const key = JSON.parse(e.currentTarget.dataset.inftrailer);

    if (btn.dataset.add === 'watched') {
      workWithLocalStor(WEB_LOCAL_WATCHED, btn, objData, objData.id);
      return;
    }

    if (btn.dataset.add === 'queue') {
      workWithLocalStor(WEB_LOCAL_QUEUE, btn, objData, objData.id);
      return;
    }

    if (btn.dataset.trailer) {
      showModalTrailer(key);
    }
  } catch (error) {}
}

function onShowModalWithInfoMovie(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) return false;

  isModalOpen();

  const id = e.target.closest('li').dataset.id;

  getMovie(id)
    .then(movie => {
      renderMarkupInfoModal(movie);
      try {
        refs.modalInfo.dataset.data = JSON.stringify(createObj(movie));
        const obj = createDataTrailer(movie);

        if (!obj) return false;

        document
          .querySelector('[data-trailer="trailer"]')
          .classList.replace('btn__trailer--hidden', 'modal-info__btn-trailer');

        refs.modalInfo.dataset.inftrailer = JSON.stringify(obj);
      } catch (error) {}
    })
    .catch(console.log);
}

function renderMarkupInfoModal(data) {
  refs.modalInfo.innerHTML = createMarkupInfoModal(data);
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

function onEscKeyDown(e) {
  if (e.code === 'Escape') {
    if (basicLightbox.visible()) {
      instance.close();
      return false;
    }
    onModalClose();
  }
}

refs.closeModalBtn.addEventListener('click', onModalClose);
refs.backdrop.addEventListener('click', onBackdropClick);
window.addEventListener('keydown', onEscKeyDown);

function renderLsMarkupListByActive() {
  if (refs.heroLib.classList.contains('vusually-hidden')) return false;

  if (refs.watchedBtn.classList.contains('hero__btn-active')) {
    chackIdLsForRender(WEB_LOCAL_WATCHED);
    let data = storage.get(WEB_LOCAL_WATCHED);
    if (data.length < 1) {
      refs.noFilm.classList.remove('vusually-hidden');
    }
  }

  if (refs.queueBtn.classList.contains('hero__btn-active')) {
    chackIdLsForRender(WEB_LOCAL_QUEUE);
    let data = storage.get(WEB_LOCAL_QUEUE);
    if (data.length < 1) {
      refs.noFilmQ.classList.remove('vusually-hidden');
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

function createDataTrailer({ videos }) {
  const obj = videos.results
    .filter(
      ({ site, name, type }) =>
        (site === 'YouTube' && type === 'Trailer' && name === 'Official Trailer') ||
        (site === 'YouTube' && type === 'Trailer'),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return obj[0];
}

function showModalTrailer(obj) {
  if (!obj) return false;

  instance = basicLightbox.create(`
    <div class="video-responsive">
    <iframe src="https://www.youtube.com/embed/${obj.key}" width="auto" height="auto" frameborder="0" allowfullscreen></iframe>
    </div>
`);

  instance.show();
}

export { findItemById, preparationGenres };
