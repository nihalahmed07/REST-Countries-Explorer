interface Country {
    name: {
      common: string;
    };
    population: number;
    capital: string[];
    region: string;
    flags: {
      png: string;
    };
  }
  
  const countryList = document.getElementById("countryList") as HTMLDivElement;
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const regionSelect = document.getElementById("region") as HTMLSelectElement;
  
  async function fetchCountries(): Promise<Country[]> {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data: Country[] = await res.json();
    return data;
  }
  
  function displayCountries(countries: Country[]) {
    countryList.innerHTML = "";
    countries.forEach((country) => {
      const div = document.createElement("div");
      div.className = "country";
      div.innerHTML = `
        <img src="${country.flags.png}" alt="${country.name.common}" />
        <h2>${country.name.common}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
        <p><strong>Region:</strong> ${country.region}</p>
      `;
      countryList.appendChild(div);
    });
  }
  
  function filterCountries(countries: Country[]) {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedRegion = regionSelect.value;
  
    return countries.filter((c) =>
      c.name.common.toLowerCase().includes(searchTerm) &&
      (selectedRegion === "" || c.region === selectedRegion)
    );
  }
  
  async function init() {
    const allCountries = await fetchCountries();
    let currentCountries = allCountries;
  
    searchInput.addEventListener("input", () => {
      displayCountries(filterCountries(currentCountries));
    });
  
    regionSelect.addEventListener("change", () => {
      displayCountries(filterCountries(currentCountries));
    });
  
    displayCountries(allCountries);
  }
  
  init();
  