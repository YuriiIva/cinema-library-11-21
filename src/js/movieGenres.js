import { BASE_URL, API_KEY } from './servises/constants';
ьщмшу;

const getMovieGenres = () => {
  return fetch(`${BASE_URL}//genre/movie/list?api_key=${API_KEY}&language=en-US`).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error('Not found'));
  });
};

getMovieGenres()
  .then(({ genres }) => {
    localStorage.setItem('movies', JSON.stringify(genres));
  })
  .catch(err => console.log(err.message));

const getMovieById = id => {
  try {
    const movies = JSON.parse(localStorage.getItem('movies'));
    const movie = movies.find(movie => movie.id === id);
    return movie ? movie.name : '';
  } catch (e) {
    console.log(e.message);
  }
};

export { getMovieById };
