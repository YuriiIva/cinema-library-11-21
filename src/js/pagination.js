import refs from './refs';

const createPagination = (currentPage, totalPages) => {
  let markup = '';
  //   if (pages === 1) {
  //     refs.paginationWrapper.classList.add("vusually-hidden");
  //     return markup;
  // }
  for (let i = 1; i <= totalPages; i++) {
      if (currentPage + 4 === i) markup += `<li class="pagination-list__item pagination-list__item--dotted" data-info='dots'>...</li>`;
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2))
        markup += `<li class="${(currentPage === i ? 'current' : '')} pagination-list__item pagination-list__item--num" data-info='${i}'>${i}</li>`;
      if (currentPage - 4 === i) markup += `<li class="pagination-list__item pagination-list__item--dotted" data-info="dots">...</li>`;
  };
  refs.paginationList.innerHTML = '';
  refs.paginationList.innerHTML = markup;
};

// const createPagination = (currentPage, totalPages) => {
//   renderPagination(currentPage, totalPages);

//   setActiveItem(currentPage);

//   // refs.paginationWrapper.addEventListener('click', e => {
//   //   if (e.currentTarget === e.target) {
//   //     return;
//   //   }

//   //   const item = e.target;

//   //   if (item.dataset.info === 'leftArrow') {
//   //     if (currentPage > 1) {
//   //       currentPage -= 1;
//   //       return;
//   //     }
//   //   }

//   //   if (item.dataset.info === 'rightArrow') {
//   //     if (currentPage < totalPages) {
//   //       currentPage += 1;
//   //       return;
//   //     }
//   //   }
//   // });
// };

// const renderPagination = (currentPage, totalPages) => {
//   let markup = renderStartPagination(currentPage);

//   const startCheckPoint = 5;
//   const endCheckPoint = totalPages - 5;

//   if (currentPage >= startCheckPoint && currentPage <= endCheckPoint) {
//     markup += renderMiddlePagination(currentPage);
//   }

//   markup += renderEndPagination(currentPage, totalPages);
//   refs.paginationList.innerHTML = markup;
// };

// const renderStartPagination = currentPage => {
//   const startCheckPoint = 5;

//   let markup = '';

//   if (currentPage < startCheckPoint) {
//     for (let i = 1; i <= 7; i += 1) {
//       markup += `<li class="pagination-list__item pagination-list__item--num" data-info='${i}'>${i}</li>`;
//     }
//     return markup;
//   }

//   markup += `<li class="pagination-list__item pagination-list__item--num" data-info='1'>1</li>
//   <li class="pagination-list__item pagination-list__item--dotted" data-info='dots'>...</li>`;

//   return markup;
// };

// const renderMiddlePagination = currentPage => {
//   const start = currentPage - 1;
//   const end = currentPage + 1;

//   let markup = '';

//   for (let i = start; i <= end; i += 1) {
//     markup += `<li class="pagination-list__item pagination-list__item--num" data-info='${i}'>${i}</li>`;
//   }

//   return markup;
// };

// const renderEndPagination = (currentPage, totalPages) => {
//   const endCheckPoint = totalPages - 5;
//   let markup = '';

//   if (currentPage > endCheckPoint) {
//     for (let i = endCheckPoint - 1; i <= totalPages; i += 1) {
//       markup += `<li class="pagination-list__item pagination-list__item--num" data-info='${i}'>${i}</li>`;
//     }
//     return markup;
//   }

//   return `<li class="pagination-list__item pagination-list__item--dotted" data-info='dots'>...</li>
//   <li class="pagination-list__item pagination-list__item--num" data-info='${totalPages}'>${totalPages}</li>`;
// };

// const setActiveItem = currentPage => {
//   const items = refs.paginationList.children;

//   const active = [...items].find(item => item.classList.contains('active'));
//   if (active) {
//     active.classList.remove('current');
//   }

//   const item = [...items].find(item => Number(item.dataset.info) === currentPage);
//   if (item) {
//     item.classList.add('current');
//   }
// };

// refs.paginationWrapper.addEventListener('click', e => {
//   if (e.currentTarget === e.target) {
//     console.log('nope');
//     return;
//   }

//   const item = e.target;
//   console.log(item);
// });

// createPagination(500, 1000);

export { createPagination };
