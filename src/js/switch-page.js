import refs from "./refs.js";
import { onWatchedMarkupLs } from "./library";
import { createFetch } from "./api-services";

function resetGallery() {
  refs.ulGallery.innerHTML = '';
}

// Go to My library
function switchToLibrary(e) {
  e.preventDefault();
  refs.homeNav.classList.remove("header__nav-active");
  refs.libNav.classList.add("header__nav-active");

  refs.heroHome.classList.add("vusually-hidden");
  refs.heroLib.classList.remove("vusually-hidden");

  refs.queueBtn.classList.remove("hero__btn-active");
  refs.watchedBtn.classList.add("hero__btn-active");

  refs.paginationWrapper.classList.add("vusually-hidden")

  onWatchedMarkupLs();
}

// Go Home
function switchToHome(e) {
  e.preventDefault();
  refs.libNav.classList.remove("header__nav-active");
  refs.homeNav.classList.add("header__nav-active");

  refs.heroLib.classList.add("vusually-hidden");
  refs.heroHome.classList.remove("vusually-hidden");

  resetGallery();
  createFetch();
  
    refs.noFilm.classList.add("vusually-hidden");
    refs.noFilmQ.classList.add("vusually-hidden");

  refs.paginationWrapper.classList.remove("vusually-hidden")
}


refs.libNav.addEventListener("click", switchToLibrary);
refs.homeNav.addEventListener("click", switchToHome);
refs.noFoundBtn.addEventListener('click', switchToHome);
refs.noFoundBtnQ.addEventListener('click', switchToHome);

export { resetGallery };