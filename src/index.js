// import Contries from './teplates/contries.hbs';
import './css/styles.css';
import fetchCountries from './fetchCountries';
// import { refs } from './refs';
import {
  createmarkUpOfOneCountry,
  createListOfContries,
} from './mark-up-of-countries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
// console.log(debounce);

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(createMarkUpCountries, DEBOUNCE_DELAY)
);

function createMarkUpCountries(event) {
  searchQuery = event.target.value;
  if (searchQuery.trim() === '') {
    refs.div.innerHTML = '';
    refs.ul.innerHTML = '';
    return;
  }
  fetchCountries(searchQuery)
    .then(contries => {
      if (contries.length <= 10) {
        const listMarkup = contries.map(country =>
          createListOfContries(country)
        );
        refs.ul.innerHTML = listMarkup.join('');
        refs.div.innerHTML = '';
      }
      if (contries.length === 1) {
        const allInfoMarkUp = contries.map(country =>
          createmarkUpOfOneCountry(country)
        );
        refs.div.innerHTML = allInfoMarkUp.join('');
        refs.ul.innerHTML = '';
      }
      if (contries.length > 10) {
        refs.div.innerHTML = '';
        refs.ul.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      //   refs.countryInfo.innerHTML = '';
      //   refs.countryList.innerHTML = '';
      return error;
    });
}
