import { createMarkupLs } from './render-markup';
import refs from './refs.js';
import storage from './servises/localStorage.js';
import { WEB_LOCAL_WATCHED, WEB_LOCAL_QUEUE } from './servises/constants.js';
import { resetGallery } from "./switch-page";

function onWatchedMarkupLs() {
  resetGallery();
  let data = storage.get(WEB_LOCAL_WATCHED);
  if (!data) {
    refs.noFilm.classList.remove("vusually-hidden");
    refs.noFilmQ.classList.add("vusually-hidden");
    refs.ulGallery.innerHTML = ''
  };

  const markup = createMarkupLs(data);
  refs.ulGallery.innerHTML = markup;

  refs.noFilmQ.classList.add("vusually-hidden");
  refs.noFilm.classList.add("vusually-hidden");
  
  if (data.length < 1) {
    refs.noFilm.classList.remove("vusually-hidden");
  }

}

function onQueueMarkupLs() {
  resetGallery();
  let data = storage.get(WEB_LOCAL_QUEUE);  
  if (!data) {
    refs.noFilmQ.classList.remove("vusually-hidden");
    refs.noFilm.classList.add("vusually-hidden");
    refs.ulGallery.innerHTML = ''
  };

  const markup = createMarkupLs(data);
  refs.ulGallery.innerHTML = markup;

  refs.noFilm.classList.add("vusually-hidden");
  refs.noFilmQ.classList.add("vusually-hidden");

  if (data.length < 1) {
    refs.noFilmQ.classList.remove("vusually-hidden");
  }
}

export { onWatchedMarkupLs, onQueueMarkupLs };
