import Notiflix from 'notiflix';

import refs from './refs';
import { createMarkup, createMarkupLs } from './render-markup';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY1 = '1f37c9d1204318c8a24c8b0a5ae713a0';
const API_KEY2 = 'f9b3a8f6c2c6ac6ea45f1e88181f9357';

const searchFilm = nameFilm => {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY1}&query=${nameFilm}&id&genres&backdrop_path&original_title&homepage&release_date&vote_average&vote_count&overview&popularity`,
  ).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error(error));
    }
    return response.json();
  });
};

const createFetch = () => {
  return fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY1}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(error));
      }
      return response.json();
    })
    .then(renderFotos)

    .catch(error => handError(error));
};

const renderFotos = data => {
  const markup = createMarkup(data.results);

  refs.ulGallery.innerHTML = markup;
};

createFetch();

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
      } else {
        renderFotos(data);
      }
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
  // console.dir('error', error.status_code);
  // if ('status_code') {
  //   Notiflix.Notify.warning('Invalid API key: You must be granted a valid key.');
  // }
  Notiflix.Notify.warning(error.message);
};

// const resetSearch = () => {
//   refs.noSearchName.innerHTML = '';
//   refs.inputFilm.value = '';
// };

refs.form.addEventListener('submit', onSearchFilm);
