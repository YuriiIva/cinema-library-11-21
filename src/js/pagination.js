import ref from './refs';

const createPagination = (currentPage, totalPages) => {
  if (window.innerWidth > 480) {
    renderPagination(currentPage, totalPages);
    return;
  }

  const markup = renderMiddlePagination(currentPage);
  ref.paginationMobileList.innerHTML = markup;
};

const renderPagination = (currentPage, totalPages) => {
  let markup = renderStartPagination(currentPage);

  const startCheckPoint = 5;
  const endCheckPoint = totalPages - 5;

  if (currentPage >= startCheckPoint && currentPage <= endCheckPoint) {
    markup += renderMiddlePagination(currentPage);
  }

  markup += renderEndPagination(currentPage, totalPages);
  ref.paginationList.innerHTML = markup;
};

const renderStartPagination = currentPage => {
  const startCheckPoint = 5;

  let markup = '';

  if (currentPage < startCheckPoint) {
    for (let i = 1; i <= 7; i += 1) {
      markup += `<li class="pagination-list__item pagination-list__item--num" data-info='${i}'>${i}</li>`;
    }
    return markup;
  }

  markup += `<li class="pagination-list__item pagination-list__item--num" data-info='1'>1</li>
  <li class="pagination-list__item pagination-list__item--dotted" data-info='dots'>...</li>`;

  return markup;
};

const renderMiddlePagination = currentPage => {
  const start = currentPage - 2;
  const end = currentPage + 2;

  let markup = '';

  for (let i = start; i <= end; i += 1) {
    markup += `<li class="pagination-list__item pagination-list__item--num" data-info='${i}'>${i}</li>`;
  }

  return markup;
};

const renderEndPagination = (currentPage, totalPages) => {
  const endCheckPoint = totalPages - 5;
  let markup = '';

  if (currentPage > endCheckPoint) {
    for (let i = endCheckPoint - 1; i <= totalPages; i += 1) {
      markup += `<li class="pagination-list__item pagination-list__item--num" data-info='${i}'>${i}</li>`;
    }
    return markup;
  }

  return `<li class="pagination-list__item pagination-list__item--dotted" data-info='dots'>...</li>
  <li class="pagination-list__item pagination-list__item--num" data-info='${totalPages}'>${totalPages}</li>`;
};

createPagination(500, 1000);
