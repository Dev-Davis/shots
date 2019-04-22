import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const domStringBuilder = () => {
  // make string
  let domString = '';
  locations.forEach((location) => {
    domString += `;<h4>${location.name}</h4>`;
  });
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
