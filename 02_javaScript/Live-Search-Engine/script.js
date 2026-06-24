const endpoint = "./assets/cities.json";

const cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    //here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, "gi");
    return place.name.match(regex) || place.state.match(regex);
  });
}
const suggestions = document.querySelector(".results-list");

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.name.replace(
        regex,
        `<span class="highlight">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="highlight">${this.value}</span>`
      );
      return `
      <li>${cityName}, ${stateName}</li>
  `;
    })
    .join("");
    if(!this.value) return suggestions.innerHTML = "";
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".searchInput");

searchInput.addEventListener("input", displayMatches);
