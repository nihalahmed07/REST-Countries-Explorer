"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const countryList = document.getElementById("countryList");
const searchInput = document.getElementById("search");
const regionSelect = document.getElementById("region");
function fetchCountries() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://restcountries.com/v3.1/all");
        const data = yield res.json();
        return data;
    });
}
function displayCountries(countries) {
    countryList.innerHTML = "";
    countries.forEach((country) => {
        var _a;
        const div = document.createElement("div");
        div.className = "country";
        div.innerHTML = `
        <img src="${country.flags.png}" alt="${country.name.common}" />
        <h2>${country.name.common}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Capital:</strong> ${((_a = country.capital) === null || _a === void 0 ? void 0 : _a[0]) || "N/A"}</p>
        <p><strong>Region:</strong> ${country.region}</p>
      `;
        countryList.appendChild(div);
    });
}
function filterCountries(countries) {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedRegion = regionSelect.value;
    return countries.filter((c) => c.name.common.toLowerCase().includes(searchTerm) &&
        (selectedRegion === "" || c.region === selectedRegion));
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const allCountries = yield fetchCountries();
        let currentCountries = allCountries;
        searchInput.addEventListener("input", () => {
            displayCountries(filterCountries(currentCountries));
        });
        regionSelect.addEventListener("change", () => {
            displayCountries(filterCountries(currentCountries));
        });
        displayCountries(allCountries);
    });
}
init();
//# sourceMappingURL=index.js.map