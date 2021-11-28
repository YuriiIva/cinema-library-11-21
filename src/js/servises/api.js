import { BASE_URL, API_KEY } from './constants.js';

function getMovie(id) {
  const url = `${BASE_URL}/${id}?api_key=${API_KEY}`;
  return fetch(url).then(response =>
    response.status === 404
      ? Promise.reject(new Error('The resource you requested could not be found.'))
      : response.json(),
  );
}

export { getMovie };
