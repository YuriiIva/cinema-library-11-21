import refs from "./refs.js";
import { onWatchedMarkupLs, onQueueMarkupLs } from "./library";

function switchToQueue() {
  refs.watchedBtn.classList.remove("hero__btn-active");
  refs.queueBtn.classList.add("hero__btn-active");

  onQueueMarkupLs();
}

function switchToWatched() {
  refs.queueBtn.classList.remove("hero__btn-active");
  refs.watchedBtn.classList.add("hero__btn-active");

  onWatchedMarkupLs();
}

refs.queueBtn.addEventListener("click", switchToQueue);
refs.watchedBtn.addEventListener("click", switchToWatched);
