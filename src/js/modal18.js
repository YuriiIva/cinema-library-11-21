import Notiflix from 'notiflix';

import refs from './refs';

console.log('refs.btn18', refs.btn18);

const verification = e => {
  if (e.target.tagName === 'BUTTON' && e.target.dataset.action === 'no') {
    Notiflix.Notify.failure(' Sorry! You still need to grow');
    // console.dir(e.currentTarget.children[0]);
    // e.currentTarget.children[0].disabled = true;
    return false;
  }
  refs.divBlur.classList.remove('in-active');
  refs.modal18.classList.add('is-hidden-btn');
};

const wasMessageShown = sessionStorage.getItem('wasMessageShown');
const showMessage = () => {
  refs.modal18.classList.remove('is-hidden-btn');
  refs.divBlur.classList.add('in-active');
  refs.btn18.addEventListener('click', verification);
  sessionStorage.setItem('wasMessageShown', true);
};
if (!wasMessageShown) {
  showMessage();
}
