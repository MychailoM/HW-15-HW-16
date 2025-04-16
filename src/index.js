import axios from "axios";
import debounce from "debounce";

const searchInput = document.getElementById("input");
const imagesList = document.querySelector(".list");

async function getName(valueInput) {
    try {
    const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${valueInput}`
    );
    makeHtml(data);
    } catch (error) {
    console.error(Error);
    }
}

function makeHtml(countrys) {
    const markup = countrys.map((country) => {
    if (countrys.length > 1) {
        imagesList.style.flexDirection = "row";
        return `
            <li class="item">
            <a class="country-name" target="_blank" href="${country.maps.googleMaps}">${country.name.common}</a>                
            </li>
            `;
    } else if (countrys.length === 1) {
        imagesList.style.flexDirection = "column";
        return `
            <li class="item">            
                <h2 class="country-name">${country.name.common}</h2>
                <img class="country-flag" src="${country.flags.png}">
                <h3 class="country-capital">capital: ${country.capital}</h3>
                <h3 class="country-area">area: ${country.area}</h3>
                <h3 class="country-population">population: ${country.population}</h3>                
                <h3 class="country-continents">continents: ${country.continents}</h3>
            </li>
        `;
    } else {
        alert("введіть коректну назву країни");
    }
    });
    imagesList.innerHTML = markup;
}

function searchCountry(e) {
    const value = searchInput.value;
    getName(value);
}

searchInput.addEventListener("input", debounce(searchCountry, 250));


