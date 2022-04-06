// API
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=52.3717204&lon=4.9020727&appid=44abe3804d948f07d6f07a1052a632b8&units=metric`;

async function getApi(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (response) {
    const weatherIcon = document.querySelector(`header > section > img`);
    const weatherTemp = document.querySelector(`header > section > p`);

    const currentWeather = data;
    const icon = data.weather[0].icon;
    const temperature = data.main.temp;

    weatherIcon.src = `http://openweathermap.org/img/w/` + icon + `.png`;
    weatherTemp.innerHTML = temperature + " °C";
    console.log(currentWeather, temperature, icon);
  }
}

getApi(apiUrl);
