export function createmarkUpOfOneCountry({
  name,
  capital,
  population,
  flags,
  languages,
}) {
  return `<div>
    <img src='${flags.svg}' alt='${name.official}' height="50px" width="90px" />
    <h2> ${name.official}</h2>
  <p><span class="country-span">Capital:<span/>${capital}</p>
  <p><span class="country-span">Population:<span/> ${population}</p>
    <p><span class="country-span">Languages:<span/> ${Object.values(
      languages
    )}</p>
</div>
`;
}

export function createListOfContries({ name, flags }) {
  return ` <li class="country-item">
      <img class="country-img" src="${flags.svg}" alt="${name.official}" height="40px" width="60px" />
      <p class="country-text" >${name.official}</p>
    </li>`;
}
