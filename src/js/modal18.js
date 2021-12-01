import Notiflix from 'notiflix';

import refs from './refs';

console.log('refs.btn18', refs.btn18);

const verification = e => {
  if (e.target.tagName === 'BUTTON' && e.target.dataset.action === 'no') {
    Notiflix.Notify.failure(' Sorry! You still need to grow');
    console.dir(e.currentTarget.children[0]);
    e.currentTarget.children[0].disabled = true;
    return false;
  }
  refs.div.classList.remove('in-active');
  refs.modal18.classList.add('is-hidden-btn');

};

refs.btn18.addEventListener('click', verification);

