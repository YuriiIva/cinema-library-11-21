import teamOfList from './data-team';
// import { teamCardTpl } from './render-markup.js';
// import teamCardTpl from '../templates/modal-team.hbs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

const refs = {
    teamBtn: document.querySelector('.page-footer__action-btn'),  
    teamList: document.querySelector('.team-list'),
    lightboxBtn: document.querySelector('.lightbox-button'),
};

const modal = basicLightbox.create(document.querySelector('.lightbox'), {
  onShow: () => {
    document.body.classList.add('body-lightbox');
    window.addEventListener('keydown', onKeyPressEsc);
  },
  onClose: () => {
    document.body.classList.remove('body-lightbox');
    window.removeEventListener('keydown', onKeyPressEsc);
  },
});

refs.teamBtn.addEventListener('click', modal.show);
markupTeamCards(teamOfList);
refs.lightboxBtn.addEventListener('click', modal.close);

function markupTeamCards(data) {
  refs.teamList.insertAdjacentHTML('beforeend', teamCardTpl(data));
}

function onKeyPressEsc(e) {
  if (e.code === 'Escape') {
    modal.close();
  }
}


function teamCardTpl({ git, photo, name, position }) {
  return `
<li class="team-item">
    <a href="${git}" class="team-link">
        <img class="team-img" src="${photo}" alt="${name}" width="100">
    </a>
    <div class="team-desc-container">
        <p class="team-name">${name}</p>
        <p class="team-position">${position}</p>
    </div>
</li> `
}