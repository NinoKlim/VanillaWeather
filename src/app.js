let forecastElements = document.querySelector("#forecast");
let dayTime = ["Morning", "Afternoon", "Night"];
let forecastHTML = `<div class="row px-2 pt-4">`;
dayTime.forEach(function (time) {
  forecastHTML =
    forecastHTML +
    ` <div class="col-4 text-center">
    <div> <small> ${time} </small></div> 
    <img src="media/cloudIcon.png"  width="30px"  alt="cloud" class="py-2"/>
   <div>+22</div>
   </div> `;
});
forecastHTML = forecastHTML + `</div>`;
forecastElements.innerHTML = forecastHTML;

function showForecast(response) {
  console.log(response);
}

function showWeather(response) {
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;
  let apiKey = `017d56650cd168d68067850318775d43`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  // console.log(response);
  axios.get(apiUrl).then(showForecast);
}

function getLocation(cityValue) {
  let apiKey = `017d56650cd168d68067850318775d43`;
  let apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function getCity(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#cityInput").value;
  getLocation(cityValue);
}

document.querySelector("#searchCityForm").addEventListener("submit", getCity);
getLocation("Kyiv");
