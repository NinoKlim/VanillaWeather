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
