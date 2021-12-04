import Notiflix from 'notiflix';

import refs from './refs';
const KEY_ADULT = 'age-check-adult';

const isAdultSs = sessionStorage.getItem(KEY_ADULT);
console.log('isAdultSs', isAdultSs);
const showMessageAd = () => {
  sessionStorage.setItem(KEY_ADULT, true);
};

const verification = e => {
  if (e.target.tagName === 'BUTTON' && e.target.dataset.action === 'no') {
    Notiflix.Notify.success(' Hello, my young Friend');
    refs.divBlur.classList.remove('in-active');
    refs.modal18.classList.add('is-hidden-btn');
    return false;
  }
  refs.divBlur.classList.remove('in-active');
  refs.modal18.classList.add('is-hidden-btn');
  if (!isAdultSs) {
    showMessageAd();
  }
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
const fn = arr =>
  arr.map(el => {
    const item = document.createElement('div');
    item.textContent = el;

    return item;
  });

console.log(fn(['html', 'css', 'js', 'react']));
