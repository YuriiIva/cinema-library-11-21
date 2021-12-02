import Notiflix from 'notiflix';
import refs from './refs';
import { createMarkup, createMarkupLs } from './render-markup';
import { createPagination } from './pagination';
import { resetGallery } from './switch-page';
import storage from './servises/localStorage.js';
import { WEB_LOCAL_WATCHED, WEB_LOCAL_QUEUE } from './servises/constants.js';
import verification from './modal18';
import { onWatchedMarkupLs } from './library';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY1 = '1f37c9d1204318c8a24c8b0a5ae713a0';
const API_KEY2 = 'f9b3a8f6c2c6ac6ea45f1e88181f9357';
let currentPage = 1;
let totalPages = 1000;
let currentSearchName = '';

const searchFilm = nameFilm => {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY1}&query=${nameFilm}&id&genres&backdrop_path&original_title&homepage&release_date&vote_average&vote_count&overview&popularity&adult&page=${currentPage}`,
  ).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error(error));
    }
    return response.json();
  });
};

const createFetch = () => {
  return fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY1}&adult&page=${currentPage}`)
    .then(response => {
      if (response.status === 401) {
        return Notiflix.Notify.failure(' Invalid API key: You must be granted a valid key');
      }
      if (!response.ok) {
        return Promise.reject(new Error(error));
      }
      return response.json();
    })
    .then(({ page, results, total_pages, adult }) => {
      renderFotos(results);
      if (total_pages <= 1) return;
      refs.paginationList.innerHTML = '';
      createPagination(page, total_pages);
      totalPages = total_pages;
    })
    .catch(error => handError(error));
};
const renderFotos = results => {
  const markup = createMarkup(results);
  refs.ulGallery.innerHTML = markup;
};
createFetch();

const onSearchFilm = e => {
  e.preventDefault();
  const inputName = refs.inputFilm.value.trim();

  refs.noSearchName.innerHTML = '';
  if (!inputName) {
    Notiflix.Notify.failure('You have not entered anything! Try again!');

    return;
  }
  currentPage = 1;
  currentSearchName = inputName;
  getFilm();
};
const getFilm = () => {
  searchFilm(currentSearchName)
    .then(data => {
      if (!data.results.length) {
        resetGallery();
        const nameNoSearch = 'Search result not successful. Enter the correct movie name ';
        refs.noSearchName.innerHTML = nameNoSearch;
        refs.failImg.classList.remove('vusually-hidden');
        refs.paginationWrapper.classList.add('vusually-hidden');
        return;
      }
      let { results, page, total_pages } = data;
      refs.failImg.classList.add('vusually-hidden');
      refs.paginationWrapper.classList.remove('vusually-hidden');
      if (total_pages < 2) {
        refs.paginationWrapper.classList.add('vusually-hidden');
      }
      renderFotos(results);
      createPagination(page, total_pages);
      totalPages = total_pages;
    })
    .catch(error => {
      handError(error);
    });
};

refs.paginationWrapper.addEventListener('click', e => {
  if (e.currentTarget === e.target) {
    return;
  }

  const item = e.target;
  if (refs.libNav.classList.contains('header__nav-active')) {
    if (refs.queueBtn.classList.contains('hero__btn-active')) {
      checkLibPagQ(item);
      return;
    }
    checkLibPag(item);
    return;
  }

  checkHomePag(item);
});

const checkHomePag = item => {
  const fetchFunction = currentSearchName ? getFilm : createFetch;
  console.log('home', item);
  if (item.dataset.info === 'leftArrow' && currentPage > 1) {
    currentPage -= 1;
    fetchFunction();
    return;
  }
  if (item.dataset.info === 'rightArrow' && currentPage < totalPages) {
    currentPage += 1;
    fetchFunction();
    return;
  }
  const targetPageNumber = Number(item.dataset.info);
  if (targetPageNumber && targetPageNumber !== currentPage) {
    currentPage = targetPageNumber;
    fetchFunction();
    return;
  }
};

const checkLibPag = item => {
  let data = storage.get(WEB_LOCAL_WATCHED);
  let pages = Math.ceil(data.length / 20);
  console.log('lib', item);
  if (item.dataset.info === 'leftArrow' && currentPage > 1) {
    currentPage -= 1;
    console.log(currentPage);
    onWatchedMarkupLs(currentPage);
    return;
  }
  if (item.dataset.info === 'rightArrow' && currentPage < pages) {
    currentPage += 1;
    onWatchedMarkupLs(currentPage);
    return;
  }
  const targetPageNumber = Number(item.dataset.info);
  if (targetPageNumber && targetPageNumber !== currentPage) {
    currentPage = targetPageNumber;
    onWatchedMarkupLs(currentPage);
    return;
  }
};

const checkLibPagQ = item => {
  let data = storage.get(WEB_LOCAL_QUEUE);
  let pages = Math.ceil(data.length / 20);
  console.log('libQ', item);
  if (item.dataset.info === 'leftArrow' && currentPage > 1) {
    currentPage -= 1;
    console.log(currentPage);
    onWatchedMarkupLs(currentPage);
    return;
  }
  if (item.dataset.info === 'rightArrow' && currentPage < pages) {
    currentPage += 1;
    onWatchedMarkupLs(currentPage);
    return;
  }
  const targetPageNumber = Number(item.dataset.info);
  if (targetPageNumber && targetPageNumber !== currentPage) {
    currentPage = targetPageNumber;
    onWatchedMarkupLs(currentPage);
    return;
  }
};

const renderFotosLs = dataLs => {
  const markup = createMarkupLs(dataLs.results);
  console.log(markup);
  refs.ulGallery.innerHTML = markup;
};
const handError = error => {
  Notiflix.Notify.warning(error.message);
};

const onClearInput = () => {
  refs.noSearchName.innerHTML = '';
  createFetch();
};
refs.form.addEventListener('submit', onSearchFilm);
refs.inputFilm.addEventListener('click', onClearInput);
export { createFetch, onClearInput };
