import refs from "./refs";

import { createMarkup, createMarkupLs } from "./render-markup";

// https://api.themoviedb.org/3/movie/550?api_key=1f37c9d1204318c8a24c8b0a5ae713a0

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY1 = "1f37c9d1204318c8a24c8b0a5ae713a0";
const API_KEY2 = "f9b3a8f6c2c6ac6ea45f1e88181f9357";

const searchFilm = (nameFilm) => {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY1}&query=${nameFilm}&id&genres&backdrop_path&original_title&homepage&release_date&vote_average&vote_count&overview&popularity`
  ).then((response) => {
    if (!response.ok) {
      return Promise.reject(new Error(error));
    }
    return response.json();
  });
};

const createFetch = () => {
  return fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY1}`)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error(error));
      }
      return response.json();
    })
    .then(renderFotos)

    .catch((error) => handError(error));
};

const renderFotos = (data) => {
  const markup = createMarkup(data.results);
  // console.log(markup);
  refs.ulGallery.innerHTML = markup;
};

createFetch();

const onSearchFilm = () => {
  refs.noSearchName.innerHTML = "";
  getFilm();
};

const getFilm = () => {
  const inputName = refs.inputFilm.value.trim();

  searchFilm(inputName)
    .then((data) => {
      console.log(data);
      if (!data.results.length) {
        console.log("BOOM!!!!");
        const nameNoSearch =
          "Search result not successful. Enter the correct movie name and ";
        refs.noSearchName.innerHTML = nameNoSearch;
        console.log(
          "Search result not successful. Enter the correct movie name and "
        );
      } else {
        renderFotos(data);
      }
    })

    .catch((error) => {
      handError(error);
    });
};

const renderFotosLs = (dataLs) => {
  const markup = createMarkupLs(dataLs.results);
  console.log(markup);
  refs.ulGallery.innerHTML = markup;
};

const handError = (error) => {
  console.log(error.massege);
};

// const resetSearch = () => {
//   refs.noSearchName.innerHTML = '';
//   refs.inputFilm.value = '';
// };

refs.btnFilm.addEventListener("click", onSearchFilm);

export { createFetch };
