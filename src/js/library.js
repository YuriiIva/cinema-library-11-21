import { createMarkupLs } from './render-markup';
import refs from './refs.js';
import storage from './servises/localStorage.js';
import { WEB_LOCAL_WATCHED, WEB_LOCAL_QUEUE } from './servises/constants.js';
import { resetGallery } from './switch-page';
import { createPagination } from './pagination';

function onWatchedMarkupLs(page) {
  resetGallery();
  let data = storage.get(WEB_LOCAL_WATCHED);
  let pages = Math.ceil(data.length / 20);

  if (!data || data.length < 1) {
    refs.noFilm.classList.remove('vusually-hidden');
    refs.noFilmQ.classList.add('vusually-hidden');
    refs.ulGallery.innerHTML = '';
    refs.paginationWrapper.classList.add('vusually-hidden');
    return;
  }

  const start = (page - 1) * 20;
  const dataLs = data.slice(start, start + 20);

  const markup = createMarkupLs(dataLs);
  refs.ulGallery.innerHTML = markup;

  refs.noFilmQ.classList.add('vusually-hidden');
  refs.noFilm.classList.add('vusually-hidden');

  createPagination(page, pages);
}

function onQueueMarkupLs(page) {
  resetGallery();
  let data = storage.get(WEB_LOCAL_QUEUE);
  let pages = Math.ceil(data.length / 20);

  if (!data || data.length < 1) {
    refs.noFilmQ.classList.remove('vusually-hidden');
    refs.noFilm.classList.add('vusually-hidden');
    refs.ulGallery.innerHTML = '';
    refs.paginationWrapper.classList.add('vusually-hidden');
    console.log(data);
    return;
  }

  const start = (page - 1) * 20;
  const dataLs = data.slice(start, start + 20);
  const markup = createMarkupLs(dataLs);
  refs.ulGallery.innerHTML = markup;

  refs.noFilm.classList.add('vusually-hidden');
  refs.noFilmQ.classList.add('vusually-hidden');

  createPagination(page, pages);
}

export { onWatchedMarkupLs, onQueueMarkupLs };
