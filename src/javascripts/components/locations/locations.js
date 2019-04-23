import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const domStringBuilder = () => {
  // make string
  let domString = '';
  domString += '<div class="row">';
  locations.forEach((location) => {
    domString += '<div class="col-3">';
    domString += `<div class="card" id="${location.id}">`;
    domString += `<img src="${location.imageUrl}" class="card-img-top">`;
    domString += '<div class="card-body">';
    domString += `<h4 class="card-header">${location.name}</h4>`;
    domString += `<p class="card-text">${location.address}</p>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  domString += '<div>';
  util.printToDom('locations', domString);
  // printToDom('locations', domString);
};

const initializeLocations = () => {
// make an axios call
  locationsData.getLocationsData()
    .then((resp) => {
      const locationsResults = resp.data.locations;
      locations = locationsResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
