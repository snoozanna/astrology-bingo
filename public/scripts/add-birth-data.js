/// CONVERTING TO CORRECT FORMAT FOR HUG

document.addEventListener("DOMContentLoaded", function () {
  const options = {
    format: "yyyymmdd",
    autoClose: true,
    yearRange: [1900, 2020],

    // onOpenEnd: function(){....}
  };
  const elems = document.querySelectorAll(".datepicker");
  const instance = M.Datepicker.init(elems, options);
  console.log("instance date", instance);
});

document.addEventListener("DOMContentLoaded", function () {
  const options = {
    twelveHour: false,
    autoClose: true,
  };
  const elems = document.querySelectorAll(".timepicker");
  const instances = M.Timepicker.init(elems, options);
  console.log("instance time", instances);
});

const myForm = document.getElementById("addDataForm");
console.log(myForm);

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const timeInput = document.getElementById("tob");
  const inputtedTime = timeInput.value;
  const timeToGo = inputtedTime.replace(":", "");
  console.log("time", timeToGo);
  timeInput.value = timeToGo;

  const dateInput = document.getElementById("dob");
  const inputtedDate = dateInput.value;

  const loc1Input = document.getElementById("location1");
  const inputtedloc1 = loc1Input.value;

  const loc2Inpu = document.getElementById("location2");
  const inputtedloc2 = loc2Inpu.value;

  const mountNode = document.getElementById("target");

  // Get From localStorage
  // const oldWeatherJSON = localStorage.getItem("weather");
  // const oldWeather = JSON.parse(oldWeatherJSON);
  // console.log("old", oldWeather);

  // if (!oldWeather) {
  // Server call (async)
  // const appId = "f6916935ad851f78c6dbd897f6f52ac7";
  // const query = `London,uk`;

  // const date = "20201112";
  // const time = "0682723";
  // const location1 = "54.978252";
  // const location2 = "-1.61778";

  fetch(
    `http://localhost:8000/formatData?date=${inputtedDate}&time=${timeToGo}&location1=${inputtedloc1}&location2=${inputtedloc2}&action=`,
  )
    .then((response) => response.json())
    .then((freshChartData) => {
      console.log("freshChartData", freshChartData);
      const freshChart = JSON.stringify(freshChartData);
      console.log("freshChart", freshChart);
      localStorage.setItem("fresh chart", freshChart);
      render(freshChart);
    })
    .catch((err) => alert(err.message));

  function render(chart, mount = mountNode) {
    // const { temp } = report.main;
    // console.log("temperature", temp);
    mount.innerHTML = `<p>The temperature is ${chart}&deg;C</p>`;
  }
});

// GEOCODING

const geoMountLat = document.getElementById("location1");
const geoMountLong = document.getElementById("location2");
const placename = "";
const GEO_API_KEY = "AIzaSyBRNa4FzlJkG1uhDvAHaB2SRbit53wq6L8";

function getGeoURL(placename, GEO_API_KEY) {
  const GEO_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${placename}&key=${GEO_API_KEY}`;
  console.log(GEO_API_URL);
  return GEO_API_URL;
}

function renderLocation(report, mount = geoMountLat) {
  if (!report) {
    geoMountLat.innerHTML = "No geo report";
    return;
  }
  console.log("report", report.results);
  const lat = report.results[0].geometry.location.lat;
  const long = report.results[0].geometry.location.lng;
  geoMountLat.value = lat;
  geoMountLong.value = long;
}

async function getLocation(currentURL, handler = renderLocation) {
  try {
    const response = await fetch(currentURL);
    console.log("response", response);
    //handle bad responses

    if (!response.status >= 200 && response.status < 300) throw response;

    const data = await response.json();
    handler(data);
  } catch (err) {
    console.log(err);
  }
}

const locationForm = document.getElementById("location-form");

locationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const placenameInput = document.getElementById("placename-input");
  const placename = placenameInput.value;
  // console.log("value", placename);
  const currentURL = getGeoURL(placename, GEO_API_KEY);
  getLocation(currentURL, renderLocation);
});
