(function () {
    let countriesData = []; // Данные стран
  
    function renderCountries(data = countriesData) {
      const countryList = document.querySelector('.country-list');
      countryList.innerHTML = '';
  
      data.forEach(country => {
        const listItem = document.createElement('li');
        const flagPic = document.createElement('img');
        const countryName = document.createElement('h2');
        const countryPopulation = document.createElement('p');
        const countryPopulationLabel = document.createElement('span');
        const countryPopulationValue = document.createTextNode(country.population);
        const countryCapital = document.createElement('p');
        const countryCapitalLabel = document.createElement('span');
        const countryCapitalValue = document.createTextNode(country.capital);
  
        flagPic.src = country.flags.png;
        flagPic.alt = `Flag of ${country.name}`;
        countryName.textContent = country.name;
  
        countryPopulationLabel.textContent = 'Population: ';
        countryPopulationLabel.classList.add('bold-text');
        countryPopulation.appendChild(countryPopulationLabel);
        countryPopulation.appendChild(countryPopulationValue);
  
        countryCapitalLabel.textContent = 'Capital: ';
        countryCapitalLabel.classList.add('bold-text');
        countryCapital.appendChild(countryCapitalLabel);
        countryCapital.appendChild(countryCapitalValue);
  
        listItem.classList.add('country-box');
        flagPic.classList.add('flag-pic');
        countryName.classList.add('country-title');
        countryPopulation.classList.add('country-parametr');
        countryCapital.classList.add('country-parametr');
  
        listItem.appendChild(flagPic);
        listItem.appendChild(countryName);
        listItem.appendChild(countryPopulation);
        listItem.appendChild(countryCapital);
  
        // Добавляем обработчик события для открытия страницы страны
        listItem.addEventListener('click', () => {
          openCountryPage(country.name);
        });
  
        countryList.appendChild(listItem);
      });
    }
  
    function filterCountries(selectedRegion) {
      let filteredData;
  
      if (selectedRegion === 'World') {
        filteredData = countriesData;
        selectedRegion = ''; // Обнуляем выбранный регион
      } else {
        filteredData = countriesData.filter(country => country.region === selectedRegion);
      }
  
      renderCountries(filteredData);
      closeDropdown();
  
      // Изменяем адрес страницы с использованием History API
      const url = new URL(window.location.href);
      url.searchParams.set('region', selectedRegion);
      history.pushState(null, '', url.toString());
    }
  
    function searchCountries(searchTerm) {
      const filteredData = countriesData.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      renderCountries(filteredData);
    }
  
    function openCountryPage(countryName) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('country', countryName);
  
      const newUrl = `country.html?${urlParams.toString()}`;
      window.location.href = newUrl;
    }
  
    function closeDropdown() {
      const dropdownContent = document.querySelector('.dropdown-content');
      const arrowIcon = document.querySelector('.arrow-icon');
  
      dropdownContent.classList.remove('dropdown-content-active');
      dropdownContent.style.display = 'none';
      arrowIcon.classList.remove('arrow-up');
    }
  
    function initializePage() {
      const dropdownToggle = document.querySelector('.dropdown-toggle');
      const dropdownContent = document.querySelector('.dropdown-content');
      const filterButtons = document.querySelectorAll('.dropdown-content li');
      const searchInput = document.querySelector('.search-txt');
  
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          countriesData = data; // Сохраняем данные
          renderCountries();
        })
        .catch(error => {
          console.log('An error occurred:', error);
        });
  
      dropdownToggle.addEventListener('click', () => {
        if (dropdownContent.classList.contains('dropdown-content-active')) {
          dropdownContent.classList.remove('dropdown-content-active');
          dropdownContent.style.display = 'none';
          arrowIcon.classList.remove('arrow-up');
        } else {
          dropdownContent.classList.add('dropdown-content-active');
          dropdownContent.style.display = 'block';
          arrowIcon.classList.add('arrow-up');
        }
      });
  
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const selectedRegion = button.dataset.region;
          filterCountries(selectedRegion);
        });
      });
  
      searchInput.addEventListener('input', event => {
        const searchTerm = event.target.value;
        searchCountries(searchTerm);
      });
  
      function closeDropdown() {
        dropdownContent.classList.remove('dropdown-content-active');
        dropdownContent.style.display = 'none';
        arrowIcon.classList.remove('arrow-up');
      }
    }
  
    initializePage();
  })();
  