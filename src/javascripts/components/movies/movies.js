import moviesData from '../../helpers/data/movieData';
import util from '../../helpers/util';

import './movies.scss';

let movies = [];

const domStringBuilder = () => {
  // make string
  let domString = '';
  movies.forEach((movie) => {
    domString += `;<h3>${movie.name}</h3>`;
    util.printToDom('movies', domString);
  });
  // printToDom('movies', domString);
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
