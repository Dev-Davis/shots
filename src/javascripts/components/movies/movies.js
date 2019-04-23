import moviesData from '../../helpers/data/movieData';
import util from '../../helpers/util';

import './movies.scss';

let movies = [];

const domStringBuilder = () => {
  // make string
  let domString = '';
  domString += '<div class="row">';
  movies.forEach((movie) => {
    domString += '<div class="col-3">';
    domString += `<div class="card text-center id=${movie.id}">`;
    domString += '<div class="card-header bg-primary">';
    domString += '<h3>Movie</h3>';
    domString += '</div>';
    domString += '<div class="card-body">';
    domString += `<h4 class="card-title">${movie.name}</h4>`;
    domString += `<p class="card-text">${movie.genre}</p>`;
    domString += `<p class="card-title">${movie.releaseDate}</p>`;
    domString += `<p class="card-title">${movie.description}</p>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('movies', domString);
};

const initializeMovies = () => {
// make an axios call
  moviesData.getMoviesData()
    .then((resp) => {
      const moviesResults = resp.data.movies;
      movies = moviesResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };
