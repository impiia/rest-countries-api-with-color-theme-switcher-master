const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('country');

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const country = data.find(item => item.name === countryName);
        if (country) {
            renderCountryDetails(data, country);
        } else {
            console.log('Country not found');
        }
    })
    .catch(error => {
        console.log('An error occurred:', error);
    });

function renderCountryDetails(data, country) {
    const countryFlag = document.querySelector('.country-flag');
    countryFlag.src = country.flags.png;
    countryFlag.alt = `Flag of ${country.name}`;


    const countryName = document.querySelector('.country-name');
    countryName.textContent = country.name;

    const countryCapital = document.querySelector('.capital-value');
    countryCapital.textContent = country.capital;

    const countryNativeName = document.querySelector('.native-name-value');
    countryNativeName.textContent = country.nativeName;

    const countryPopulation = document.querySelector('.population-value');
    countryPopulation.textContent = country.population;

    const countryRegion = document.querySelector('.region-value');
    countryRegion.textContent = country.region;

    const countrySubRegion = document.querySelector('.subregion-value');
    countrySubRegion.textContent = country.subregion;

    const countryDomane = document.querySelector('.country-domane-value');
    countryDomane.textContent = country.topLevelDomain;

    const countryCurrencies = document.querySelector('.country-currencies-value');
    countryCurrencies.textContent = country.currencies[0].name;
    
    const countryLanguages = document.querySelector('.country-language-value');
const languages = country.languages.map(language => language.name); // Получаем массив названий языков
const languageNames = languages.join(', '); // Собираем все названия языков в одну строку через запятую
countryLanguages.textContent = languageNames;


const countryBorders = document.querySelector('.border_countries');

country.borders.forEach(borderCode => {
    console.log(borderCode);
  const borderCountry = data.find(item => item.alpha3Code === borderCode);
  console.log(borderCountry);
  if (borderCountry) {
    const borderButton = document.createElement('button');
    borderButton.textContent = borderCountry.name;
    borderButton.classList.add('border_country_btn');
   countryBorders.appendChild(borderButton);

   borderButton.addEventListener('click', () => {
    const countryName = borderCountry.name; // Получаем название страны из текста кнопки
    const url = `country.html?country=${encodeURIComponent(countryName)}`; // Формируем URL с параметром страны
    window.location.href = url; // Перенаправляем пользователя на страницу страны
  });
  }
});

}

// Находим кнопку "Back" по классу
const backButton = document.querySelector('.back-btn');

// Назначаем обработчик события клика на кнопку
backButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Перенаправляем пользователя на главную страницу
});

