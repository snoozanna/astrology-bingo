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
});

document.addEventListener("DOMContentLoaded", function () {
  const options = {
    twelveHour: false,
    autoClose: true,
  };
  const elems = document.querySelectorAll(".timepicker");
  const instances = M.Timepicker.init(elems, options);
});

const myForm = document.getElementById("addDataForm");
const chartMountNode = document.getElementById("target");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const timeInput = document.getElementById("tob");
  const inputtedTime = timeInput.value;
  const timeToGo = inputtedTime.replace(":", "");
  timeInput.value = timeToGo;

  const dateInput = document.getElementById("dob");
  const inputtedDate = dateInput.value;

  const loc1Input = document.getElementById("location1");
  const inputtedloc1 = loc1Input.value;

  const loc2Inpu = document.getElementById("location2");
  const inputtedloc2 = loc2Inpu.value;

  const fetchURL = `http://localhost:8000/formatData?date=${inputtedDate}&time=${timeToGo}&location1=${inputtedloc1}&location2=${inputtedloc2}&action=`;

  getBirthChart(fetchURL, renderChart);
});

function renderChart(chart, mount = chartMountNode) {
  if (!chart) {
    chartMountNode.innerHTML = "No chart";
    return;
  }
  mount.innerHTML = `${chart}`;
}

async function getBirthChart(fetchURL, handler = renderChart) {
  try {
    const response = await fetch(fetchURL);
    //handle bad responses
    if (!response.status >= 200 && response.status < 300) throw response;
    const chartData = await response.json();
    handler(chartData);
    // console.log("chartData", chartData);
    const replaced = chartData.replace(/'/g, '"');
    const parsed = JSON.parse(replaced);
    const newBirthChart = parsed;
    console.log('new Birth Chart', newBirthChart)
  } catch (err) {
    console.log(err);
  }
}

//   fetch(
//     `http://localhost:8000/formatData?date=${inputtedDate}&time=${timeToGo}&location1=${inputtedloc1}&location2=${inputtedloc2}&action=`,
//   )
//     .then((response) => response.json())
//     .then((freshChartData) => {
//       console.log("freshChartData", freshChartData);
//       const freshChart = JSON.stringify(freshChartData);
//       // const freshChart = JSON.parse(freshChartData);
//       console.log("freshChart", freshChart);
//       // const map2 = new Map(freshChart);
//       // console.log("newmap", map2);

//       localStorage.setItem("fresh chart", freshChart);
//       render(freshChart);
//     })
//     .catch((err) => alert(err.message));

//   function render(chart, mount = mountNode) {
//     // const { temp } = report.main;
//     // console.log("temperature", temp);
//     mount.innerHTML = `${chart}`;
//   }
// });

///function that sends this data to firebase

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
  const lat = report.results[0].geometry.location.lat;
  const long = report.results[0].geometry.location.lng;
  geoMountLat.value = lat;
  geoMountLong.value = long;
}

async function getLocation(currentURL, handler = renderLocation) {
  try {
    const response = await fetch(currentURL);
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
