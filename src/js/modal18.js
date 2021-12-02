import Notiflix from 'notiflix';

import refs from './refs';

const verification = e => {
  if (e.target.tagName === 'BUTTON' && e.target.dataset.action === 'no') {
    Notiflix.Notify.success(' Sorry! You still need to grow up');
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
