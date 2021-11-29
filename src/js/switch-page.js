import refs from "./refs.js";
import { onWatchedMarkupLs } from "./library";
import { createMarkup } from "./render-markup";
import { createFetch } from "./api-services";

function switchToLibrary(e) {
  e.preventDefault();
  refs.homeNav.classList.remove("header__nav-active");
  refs.libNav.classList.add("header__nav-active");

  refs.heroHome.classList.add("vusually-hidden");
  refs.heroLib.classList.remove("vusually-hidden");

  onWatchedMarkupLs();
}

function switchToHome(e) {
  e.preventDefault();
  refs.libNav.classList.remove("header__nav-active");
  refs.homeNav.classList.add("header__nav-active");

  refs.heroLib.classList.add("vusually-hidden");
  refs.heroHome.classList.remove("vusually-hidden");

  createFetch();
}

refs.libNav.addEventListener("click", switchToLibrary);
refs.homeNav.addEventListener("click", switchToHome);
