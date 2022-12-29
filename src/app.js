function curDate() {
  let now = new Date();
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

  let formDate = `${day}, ${hours}:${minutes}`;
  return formDate;
}
document.querySelector("#date").innerHTML = curDate(new Date());
let forecastElements = document.querySelector("#forecast");

function showForecast(response) {
  console.log(response);
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = celsiusTemperature;

  document.querySelector("#city-name").innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://www.linkpicture.com/q/${response.data.weather[0].icon}.png`
  );
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

function displayCity(cityValue) {
  getLocation(cityValue.data[0].name);
}
const p1 = new Promise((resolve, reject) => {
  resolve("Success");
});

p1.then((value) => {
  console.log(value); // "Success!"
  throw new Error("oh, no!");
})
  .catch((e) => {
    console.error(e.message); // "oh, no!"
  })
  .then(
    () => console.log("after a catch the chain is restored"),
    () => console.log("Not fired due to the catch")
  );

function curCity(response) {
  console.log(response);
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = `017d56650cd168d68067850318775d43`;
  let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCity);
}
navigator.geolocation.getCurrentPosition(curCity);

p1.then((value) => {
  console.log(value); // "Success!"
  return Promise.reject("oh, no!");
})
  .catch((e) => {
    console.error(e); // "oh, no!"
  })
  .then(
    () => console.log("after a catch the chain is restored"),
    () => console.log("Not fired due to the catch")
  );
let celsiusLink = document.querySelector("#celcius");
celsiusLink.addEventListener("click", showCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

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
