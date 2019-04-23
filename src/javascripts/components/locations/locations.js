import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const shootTimeClass = (shootTime) => {
  let selectedClass = '';
  switch (shootTime) {
    case 'Morning':
      selectedClass = 'bg-secondary';
      break;
    case 'Afternoon':
      selectedClass = 'bg-success';
      break;
    case 'Evening':
      selectedClass = 'bg-info';
      break;
    case 'After Dark':
      selectedClass = 'bg-danger';
      break;
    default:
      selectedClass = '';
  }
  return selectedClass;
};

const domStringBuilder = (locArray) => {
  // make string
  let domString = '';
  domString += '<div class="row">';
  locArray.forEach((location) => {
    domString += '<div class="col-3">';
    domString += `<div class="card" id="${location.id}">`;
    domString += `<img src="${location.imageUrl}" class="card-img-top">`;
    domString += '<div class="card-body">';
    domString += `<h4 class="card-header ${shootTimeClass(location.shootTime)}">${location.name}</h4>`;
    domString += `<p class="card-text">${location.address}</p>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  domString += '<div>';
  util.printToDom('locations', domString);
  // printToDom('locations', domString);
};
const filter = (e) => {
  const buttonId = e.target.id;

  const dark = locations.filter(x => x.shootTime === 'After Dark');
  const all = locations.filter(x => x.shootTime === 'All');
  const morning = locations.filter(x => x.shootTime === 'Morning');
  const afternoon = locations.filter(x => x.shootTime === 'Afternoon');
  const evening = locations.filter(x => x.shootTime === 'Evening');

  switch (buttonId) {
    case 'dark':
      domStringBuilder(dark);
      break;
    case 'all':
      domStringBuilder(all);
      break;
    case 'morning':
      domStringBuilder(morning);
      break;
    case 'afternoon':
      domStringBuilder(afternoon);
      break;
    case 'evening':
      domStringBuilder(evening);
      break;
    default: domStringBuilder(locations);
  }
};

const filterByTextEvent = (e) => {
  const searchText = e.target.value;
  const searchLocations = locations.filter((x) => {
    const hasName = x.name.includes(searchText);
    const hasAddress = x.address.includes(searchText);
    return hasName || hasAddress;
  });
  domStringBuilder(searchLocations);
};

const initializeLocations = () => {
  // make an axios call
  locationsData.getLocationsData()
    .then((resp) => {
      const locationsResults = resp.data.locations;
      locations = locationsResults;
      domStringBuilder(locations);
      document.getElementById('all').addEventListener('click', filter);
      document.getElementById('morning').addEventListener('click', filter);
      document.getElementById('afternoon').addEventListener('click', filter);
      document.getElementById('evening').addEventListener('click', filter);
      document.getElementById('dark').addEventListener('click', filter);
      document.getElementById('searchBox').addEventListener('click', filterByTextEvent);
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
