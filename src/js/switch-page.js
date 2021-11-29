import refs from "./refs.js";

function switchToLibrary(e) {
  e.preventDefault();
  refs.homeNav.classList.remove("header__nav-active");
  refs.libNav.classList.add("header__nav-active");

  refs.heroHome.classList.add("vusually-hidden");
  refs.heroLib.classList.remove("vusually-hidden");

  refs.ulGallery.classList.add("vusually-hidden");
  refs.ulLibrary.classList.remove("vusually-hidden");
}

function switchToHome(e) {
  e.preventDefault();
  refs.libNav.classList.remove("header__nav-active");
  refs.homeNav.classList.add("header__nav-active");

  refs.heroLib.classList.add("vusually-hidden");
  refs.heroHome.classList.remove("vusually-hidden");

  refs.ulGallery.classList.remove("vusually-hidden");
  refs.ulLibrary.classList.add("vusually-hidden");
}

refs.libNav.addEventListener("click", switchToLibrary);
refs.homeNav.addEventListener("click", switchToHome);
