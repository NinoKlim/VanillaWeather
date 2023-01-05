function curDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
document.querySelector("#date").innerHTML = curDate(new Date());

function weekDays(dt) {
  let date = new Date(dt * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();

  return days[day];
}

function showDailyForecast(week) {
  let forecastElements = document.querySelector("#forecast");
  let weekForecast = week.data.daily;
  let forecastHTML = `<div class="row px-2 pt-4">`;
  weekForecast.forEach(function (weekDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 text-center py-4">
            <div> <small> ${weekDays(weekDay.dt)} </small></div> 
            <img src="https://github.com/NinoKlim/VanillaWeather/blob/main/media/${
              weekDay.weather[0].icon
            }.png?raw=true"  width="30px"  alt="cloud" class="py-2"/>
          <div> <span class="temp-max">${Math.round(weekDay.temp.max)}°</span> 
          <span class="temp-min">${Math.round(weekDay.temp.min)}°</span> </div>
      </div> `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElements.innerHTML = forecastHTML;
  console.log(week);
}

function showForecast(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = celsiusTemperature;

  document.querySelector("#city-name").innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://github.com/NinoKlim/VanillaWeather/blob/main/media/${response.data.weather[0].icon}.png?raw=true`
  );
  document.querySelector("#date").innerHTML = curDate(
    response.data.dt * 1000 - response.data.timezone * 1000
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#hum").innerHTML = response.data.main.humidity;
  console.log(response.data);
  getDailyForecast(response.data.coord);
}

function getDailyForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `017d56650cd168d68067850318775d43`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDailyForecast);
}

function getCity(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#cityInput").value;
  getLocation(cityValue);
}
document.querySelector("#searchCityForm").addEventListener("submit", getCity);

function getLocation(cityValue) {
  let apiKey = `017d56650cd168d68067850318775d43`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function currentCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `017d56650cd168d68067850318775d43`;
  let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCity);
}

let celsiusLink = document.querySelector("#celcius");
celsiusLink.addEventListener("click", showCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

function displayCity(cityValue) {
  getLocation(cityValue.data[0].name);
}

navigator.geolocation.getCurrentPosition(currentCity);

function showCelcius(event) {
  event.preventDefault();
  celsiusLink.classList.add("unitActive");
  fahrenheitLink.classList.remove("unitActive");
  document.querySelector("#temperature").innerHTML = celsiusTemperature;
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("unitActive");
  fahrenheitLink.classList.add("unitActive");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
}
