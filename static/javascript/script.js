console.log("waddup");

// const homeButton = document.querySelector("nav ul li:nth-of-type(1)");
// const likeButton = document.querySelector("nav ul li:nth-of-type(2)");
// const accountButton = document.querySelector("nav ul li:nth-of-type(3)");

// homeButton.addEventListener("click", () => {
//     homeButton.classList.add("active");
//     likeButton.classList.remove("active");
//     accountButton.classList.remove("active");
// })

// likeButton.addEventListener("click", () => {
//     homeButton.classList.remove("active");
//     likeButton.classList.add("active");
//     accountButton.classList.remove("active");
// })

// accountButton.addEventListener("click", () => {
//     homeButton.classList.remove("active");
//     likeButton.classList.remove("active");
//     accountButton.classList.add("active");
// })




// API
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=52.3717204&lon=4.9020727&appid=44abe3804d948f07d6f07a1052a632b8&units=metric";


async function getApi(url) {
    // alle data uit url opslaan in response
    const response = await fetch(url);
    
    // data uit response opslaan in json vorm onder data
    const data = await response.json();

    if (response) {
        //html section element = quote
        const weatherIcon = document.querySelector('header > section > img');
        const weatherTemp = document.querySelector('header > section > p');
        // quote ophalen
        const currentWeather = data;
        const icon = data.weather[0].icon;
        const temperature = data.main.temp;
        //quote plaatsen in de html
        weatherIcon.src = "http://openweathermap.org/img/w/" +icon+ ".png";
        weatherTemp.innerHTML = temperature + " °C";
        console.log(currentWeather, temperature, icon);
    }
}

    // async functie aanroepen
    getApi(apiUrl);