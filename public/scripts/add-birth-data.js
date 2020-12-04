document.addEventListener("DOMContentLoaded", function () {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCrq65EKfvEZI6mNzsF-UbMhcUdY0uJb1U",
    authDomain: "astrology-bingo.firebaseapp.com",
    databaseURL: "https://astrology-bingo.firebaseio.com",
    projectId: "astrology-bingo",
    storageBucket: "astrology-bingo.appspot.com",
    messagingSenderId: "725757025898",
    appId: "1:725757025898:web:e4f52d1d90d47ebf8b7413",
    measurementId: "G-7Y703BQ6B4",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  const database = firebase.database();
  const query = firebase.database().ref();
  return query;
});

function saveBirthChart(newBirthChart) {
  firebase
    .database()
    .ref(`charts-in-play/${newBirthChart._id}`)
    // .child("sun")
    .set(
      {
        sun: newBirthChart.Sun,
        ascendant: newBirthChart.Asc,
        moon: newBirthChart.Moon,
        mercury: newBirthChart.Mercury,
        venus: newBirthChart.Venus,
        mars: newBirthChart.Mars,
        jupiter: newBirthChart.Jupiter,
        saturn: newBirthChart.Saturn,
        uranus: newBirthChart.Uranus,
        neptune: newBirthChart.Neptune,
        pluto: newBirthChart.Pluto,
        _id: newBirthChart._id,
        descendant: newBirthChart.Desc,
      },
      (error) => {
        if (error) {
          console.log("failed", error);
          // The write failed...
        } else {
          console.log("data saved sucessfully");
          // Data saved successfully!
        }
      },
    );
}

function uuidv4() {
  return "xxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function calculateDesc(ascendant) {
  switch (ascendant) {
    case "Aries":
      return "Libra";
      break;
    case "Taurus":
      return "Scorpio";
      break;
    case "Gemini":
      return "Sagittarius";
      break;
    case "Cancer":
      return "Capricorn";
      break;
    case "Leo":
      return "Aquarius";
      break;
    case "Virgo":
      return "Pisces";
      break;
    case "Libra":
      return "Aries";
    case "Scorpio":
      return "Taurus";
      break;
    case "Sagittarius":
      return "Gemini";
      break;
    case "Capricorn":
      return "Cancer";
      break;
    case "Aquarius":
      return "Leo";
      break;
    case "Pisces":
      return "Virgo";
    default:
      console.log("default");
      break;
  }
}

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

const utcButton = document.getElementById("find-utc");

utcButton.addEventListener("click", function (e) {
  e.preventDefault();
  const timeInput = document.getElementById("tob");
  const inputtedTime = timeInput.value;
  console.log("inputtedTime", inputtedTime);
  const timeToGo = inputtedTime.replace(":", "");
  timeInput.value = timeToGo;

  const dateInput = document.getElementById("dob");
  const inputtedDate = dateInput.value;
  console.log("inputtedDate", inputtedDate);

  const loc1Input = document.getElementById("location1");
  const inputtedloc1 = loc1Input.value;

  const loc2Inpu = document.getElementById("location2");
  const inputtedloc2 = loc2Inpu.value;

  const year = inputtedDate.slice(0, 4);
  console.log("year", year);

  const month = inputtedDate.slice(4, 6);
  console.log("month", month);

  const day = inputtedDate.slice(6, 8);
  console.log("day", day);

  const dateTime = `${year}-${month}-${day} ${inputtedTime}:00`;
  console.log("dateTime", dateTime);

  const timestamp = Date.parse(dateTime) / 1000;
  console.log("timestamp", timestamp);

  const fetchURLUTC = `https://maps.googleapis.com/maps/api/timezone/json?location=${inputtedloc1},${inputtedloc2}&timestamp=${timestamp}&key=${TIME_API_KEY}`;
  console.log("fetchURLUTC", fetchURLUTC);
  getUTC(fetchURLUTC, renderUTC);
});

myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const timeInput = document.getElementById("tob");
  const timeToGo = timeInput.value;

  const dateInput = document.getElementById("dob");
  const inputtedDate = dateInput.value;

  const loc1Input = document.getElementById("location1");
  const inputtedloc1 = loc1Input.value;

  const loc2Input = document.getElementById("location2");
  const inputtedloc2 = loc2Input.value;

  const utcInput = document.getElementById("utc-input");
  const utcoffset = utcInput.value;

  console.log("utcOffset", utcoffset);

  // console.log("time, date", inputtedTime, inputtedDate);

  const fetchAstroURL = `http://localhost:8000/formatData?date=${inputtedDate}&time=${timeToGo}&location1=${inputtedloc1}&location2=${inputtedloc2}&utc=${utcoffset}&action=`;

  console.log("fetchAstroURL", fetchAstroURL);

  getBirthChart(fetchAstroURL, renderChart);
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
    //clean data
    const replaced = chartData.replace(/'/g, '"');
    const parsed = JSON.parse(replaced);
    const newBirthChart = parsed;
    //calc id & desc
    newBirthChart._id = uuidv4();
    const ascendant = newBirthChart.Asc;
    newBirthChart.Desc = calculateDesc(ascendant);
    console.log("new Birth Chart", newBirthChart);
    saveBirthChart(newBirthChart);
  } catch (err) {
    console.log(err);
  }
}

///UTC

const timeMount = document.getElementById("utc-input");
const TIME_API_KEY = "AIzaSyCVeMcz7k47EOLRUjdYKecPFJylBFdpdms";
// const timestamp = "841005900";
const lat = 39.603481;
const long = -119.682251;

///const timestamp = Date.parse("2020-11-23 12:56:07")/1000;

function getUTCURL(lat, long, TIME_API_KEY, timestamp) {
  const TIME_API_URL = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${long}&timestamp=${timestamp}&key=${TIME_API_KEY}`;
  console.log(TIME_API_URL);
  return TIME_API_URL;
}

function renderUTC(report, mount = timeMount) {
  if (!report) {
    timeMount.innerHTML = "No utc report";
    return;
  }
  // timeMount.innerHTML = report;
  // console.log("report", report);
  const offset = (report.rawOffset += report.dstOffset);
  console.log("offset", offset);
  const offsetUTC = Math.floor(offset / 60 / 60);
  console.log("offsetUTC", offsetUTC);
  timeMount.value = offsetUTC;
}

async function getUTC(currentURL, handler = renderUTC) {
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
  // const utcURL = getUTCURL(lat, long, TIME_API_KEY, timestamp);
  getLocation(currentURL, renderLocation);
});
