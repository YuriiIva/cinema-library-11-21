import Notiflix from 'notiflix';

import refs from './refs';
import { createMarkup, createMarkupLs } from './render-markup';
import { createPagination } from './pagination';
import verification from './modal18';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY1 = '1f37c9d1204318c8a24c8b0a5ae713a0';
const API_KEY2 = 'f9b3a8f6c2c6ac6ea45f1e88181f9357';
let currentPage = 1;
let currentSearchPage = 1;

const searchFilm = nameFilm => {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY1}&query=${nameFilm}&id&genres&backdrop_path&original_title&homepage&release_date&vote_average&vote_count&overview&popularity&page=${currentSearchPage}`,
  ).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error(error));
    }
    return response.json();
  });
};

const createFetch = () => {
  return fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY1}&page=${currentPage}`)
    .then(response => {
      if (response.status === 401) {
        return Notiflix.Notify.failure(' Invalid API key: You must be granted a valid key');
      }
      if (!response.ok) {
        return Promise.reject(new Error(error));
      }
      return response.json();
    })
    .then(({ page, results, total_pages }) => {
      renderFotos(results);

      createPagination(page, total_pages);

      refs.paginationWrapper.addEventListener('click', e => {
        if (e.currentTarget === e.target) {
          return;
        }

        const item = e.target;

        if (item.dataset.info === 'leftArrow' && page > 1) {
          page -= 1;
          currentPage = page;
          createFetch();
          return;
        }

        if (item.dataset.info === 'rightArrow' && page < total_pages) {
          page += 1;
          currentPage = page;
          createFetch();
          return;
        }

        if (Number(e.target.dataset.info)) {
          const targetPage = Number(e.target.dataset.info);
          page = targetPage;
          currentPage = targetPage;
          createFetch();
          return;
        }
      });
    })
    .catch(error => handError(error));
};

const renderFotos = results => {
  const markup = createMarkup(results);

  refs.ulGallery.innerHTML = markup;
};

createFetch();
// verification();

const onSearchFilm = e => {
  e.preventDefault();
  refs.noSearchName.innerHTML = '';
  getFilm();
};

const getFilm = () => {
  const inputName = refs.inputFilm.value.trim();
  if (!inputName) {
    refs.noSearchName.innerHTML = '';
    Notiflix.Notify.failure(' You have not entered  anything! Try again!');
    return;
  }

  searchFilm(inputName)
    .then(data => {
      if (!data.results.length) {
        const nameNoSearch = 'Search result not successful. Enter the correct movie name and ';
        refs.noSearchName.innerHTML = nameNoSearch;
        return;
      }

      renderFotos(data.results);

      // let { page, total_pages } = data;

      // createPagination(page, total_pages);

      // refs.paginationWrapper.addEventListener('click', e => {
      //   if (e.currentTarget === e.target) {
      //     return;
      //   }

      //   const item = e.target;

      //   if (item.dataset.info === 'leftArrow' && page > 1) {
      //     page -= 1;
      //     currentSearchPage = page;
      //     getFilm();
      //     return;
      //   }

      //   if (item.dataset.info === 'rightArrow' && page < total_pages) {
      //     page += 1;
      //     currentSearchPage = page;
      //     getFilm();
      //     return;
      //   }

      //   if (Number(e.target.dataset.info)) {
      //     const targetPage = Number(e.target.dataset.info);
      //     page = targetPage;
      //     currentSearchPage = targetPage;
      //     console.log('current 1', currentSearchPage);
      //     getFilm();
      //     return;
      //   }
      // });
    })

    .catch(error => {
      handError(error);
    });
};

const renderFotosLs = dataLs => {
  const markup = createMarkupLs(dataLs.results);
  console.log(markup);
  refs.ulGallery.innerHTML = markup;
};

const handError = error => {
  Notiflix.Notify.warning(error.message);
};

// const resetSearch = () => {
//   refs.noSearchName.innerHTML = '';
//   refs.inputFilm.value = '';
// };

refs.form.addEventListener('submit', onSearchFilm);

export { createFetch };
