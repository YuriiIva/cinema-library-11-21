import refs from "./refs.js";
import { onQueueMarkupLs } from "./library";
import { createMarkupLs } from "./render-markup";
import { resetGallery } from "./switch-page";

function switchToQueue() {
  refs.watchedBtn.classList.remove("hero__btn-active");
  refs.queueBtn.classList.add("hero__btn-active");

  if (!refs.ulGallery.length) {
    refs.noFilmQ.classList.remove("vusually-hidden");
    refs.noFilm.classList.add("vusually-hidden");

  }
  
  // if (refs.noFilmQ.classList.toggle('vusually-hidden'));

  resetGallery();
  onQueueMarkupLs();
}

function switchToWatched() {
  refs.queueBtn.classList.remove("hero__btn-active");
  refs.watchedBtn.classList.add("hero__btn-active");

  if (!refs.ulGallery.length) {
    refs.noFilm.classList.remove("vusually-hidden");
    refs.noFilmQ.classList.add("vusually-hidden");
  }

  resetGallery();
  createMarkupLs();
}

refs.queueBtn.addEventListener("click", switchToQueue);
refs.watchedBtn.addEventListener("click", switchToWatched);
