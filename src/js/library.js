import { createMarkupLs } from "./render-markup";
import refs from "./refs.js";
import storage from "./servises/localStorage.js";
import { WEB_LOCAL_WATCHED, WEB_LOCAL_QUEUE } from "./servises/constants.js";

function onWatchedMarkupLs() {
  let data = storage.get(WEB_LOCAL_WATCHED);
  const markup = createMarkupLs(data);
  refs.ulGallery.innerHTML = markup;
}

function onQueueMarkupLs() {
  let data = storage.get(WEB_LOCAL_QUEUE);
  const markup = createMarkupLs(data);
  refs.ulGallery.innerHTML = markup;
}

refs.watchedBtn.addEventListener("click", onWatchedMarkupLs);
refs.queueBtn.addEventListener("click", onQueueMarkupLs);

export { onWatchedMarkupLs, onQueueMarkupLs };
