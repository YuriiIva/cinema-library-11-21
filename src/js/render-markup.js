const createMarkup = data => {
  console.log(data);
  return data
    .map(
      ({ backdrop_path, original_title, genre_ids, release_date }) => `
<li data-id="id" class="gallery__item">
<img src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="">
<div class="gallery__info">
<p class="gallery__info-name">${original_title}</p>
<p class="gallery__information">${genre_ids}|${release_date}</p>
</div>
</li>
</ul>`,
    )
    .join('');
};

const createMarkupId = dataId => {
  return dataId
    .map(
      ({ backdrop_path, original_title, genre_ids, release_date, id }) => `
   <li data-id="id" class="gallery__item">
<img src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="">
<div class="gallery__info">
<p class="gallery__info-name">${original_title}</p>
<p class="gallery__information">${genre_ids}|${release_date}<span class="gallery__rating">${id}</span></p>
</div>
</li> `,
    )
    .join('');
};

export { createMarkup, createMarkupId };
