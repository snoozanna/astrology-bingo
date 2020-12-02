// FIRE BASE CONNECTION

// document.addEventListener("DOMContentLoaded", function () {
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
firebase.analytics();
// console.log("firebase", firebase);

const queryCharts = firebase.database().ref("/charts-in-play/");

queryCharts.on("value", (snapshot) => {
  const data = snapshot.val();
  console.log("new data", data);
  let birthChartDataFB = data;
  console.log(
    " this the actual data from firebase - birthChartDataFB",
    birthChartDataFB,
  );

  // return birthChartDataFB;
  addToArr(birthChartDataFB);
});
// });

///RETRIEVING THE DATA

// let birthChartDataFB = {};
const birthChartDataArr = [];

function addToArr(data) {
  if (data.hasOwnProperty) {
    for (const [key, value] of Object.entries(data)) {
      console.log(`adding ${value}to birthChartDataArr`);
      // console.log(value, key);
      // value[key] = key;
      birthChartDataArr.push(value);
    }
  }
}
console.log(
  "this is the array that has had the FB data added to it birthChartArr",
  birthChartDataArr,
);
console.log("birthChartArr as a string", JSON.stringify(birthChartDataArr));

// MAIN APP

class BirthChart {
  constructor(
    sun,
    moon,
    ascendant,
    mercury,
    venus,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto,
    descendant,
    _id,
  ) {
    this.sun = {
      sign: sun,
      icon: BirthChart.getIconSVG(sun),
      location: { x: 500, y: -250 },
    };
    this.moon = {
      sign: moon,
      icon: BirthChart.getIconSVG(moon),
      location: { x: 380, y: -270 },
    };
    this.ascendant = {
      sign: ascendant,
      icon: BirthChart.getIconSVG(ascendant),
      location: { x: 180, y: -100 },
    };
    this.mercury = {
      sign: mercury,
      icon: BirthChart.getIconSVG(mercury),
      location: { x: 650, y: -220 },
    };
    this.venus = {
      sign: venus,
      icon: BirthChart.getIconSVG(venus),
      location: { x: 670, y: -90 },
    };
    this.mars = {
      sign: mars,
      icon: BirthChart.getIconSVG(mars),
      location: { x: 680, y: 50 },
    };
    this.jupiter = {
      sign: jupiter,
      icon: BirthChart.getIconSVG(jupiter),
      location: { x: 610, y: 170 },
    };
    this.saturn = {
      sign: saturn,
      icon: BirthChart.getIconSVG(saturn),
      location: { x: 490, y: 220 },
    };
    this.uranus = {
      sign: uranus,
      icon: BirthChart.getIconSVG(uranus),
      location: { x: 370, y: 230 },
    };
    this.neptune = {
      sign: neptune,
      icon: BirthChart.getIconSVG(neptune),
      location: { x: 240, y: 160 },
    };
    this.pluto = {
      sign: pluto,
      icon: BirthChart.getIconSVG(pluto),
      location: { x: 180, y: 50 },
    };
    this.descendant = {
      sign: descendant,
      icon: BirthChart.getIconSVG(descendant),
      location: { x: 230, y: -220 },
    };

    // this._id = uuidv4();
    this._id = _id;
  }

  // static getIconSVG(sign) {
  //   switch (sign) {
  //     case "Aries":
  //       return "./assets/img/aries.svg";
  //       break;
  //     case "Taurus":
  //       return "./assets/img/taurus.svg";
  //       break;
  //     case "Gemini":
  //       return "./assets/img/gemini.svg";
  //       break;
  //     case "Cancer":
  //       return "./assets/img/cancer.svg";
  //       break;
  //     case "Leo":
  //       return "./assets/img/leo.svg";
  //       break;
  //     case "Virgo":
  //       return "./assets/img/virgo.svg";
  //       break;
  //     case "Libra":
  //       return "./assets/img/libra.svg";
  //     case "Scorpio":
  //       return "./assets/img/scorpio.svg";
  //       break;
  //     case "Sagittarius":
  //       return "./assets/img/sagittarius.svg";
  //       break;
  //     case "Capricorn":
  //       return "./assets/img/capricorn.svg";
  //       break;
  //     case "Aquarius":
  //       return "./assets/img/aquarius.svg";
  //       break;
  //     case "Pisces":
  //       return "./assets/img/pisces.svg";
  //     default:
  //       console.log("default");
  //       break;
  //   }
  // }

  static getIconSVG(sign) {
    switch (sign) {
      case "Aries":
        // return "./assets/img/aries.svg";
        return `<path d="M233.15 0l24.88 58.3c-5.35 2.37-10.52 4.64-15.85 7l-16.79-39.84-60.92 39.81-16.94-39.81-60.25 39.81c-5.66-13.33-11.2-26.42-16.88-39.81C50.05 38.78 29.92 51.96 9.54 65.3l-9.41-14L77.95.01c5.75 13.31 11.41 26.43 17.18 39.82L155.67.02c5.67 13.34 11.27 26.49 16.94 39.81zM9.38 172.62l-9.38-14 77.81-51.27 17.18 39.82 60.53-39.81c5.67 13.32 11.26 26.45 16.94 39.81L233 107.35l24.89 58.29-15.85 7c-5.57-13.29-11.09-26.41-16.76-39.86l-60.82 39.82-16.93-39.82-60.25 39.81-17-39.81z"/>`;
        break;
      case "Taurus":
        // return "./assets/img/taurus.svg";
        return `<path d="M66.51 85.58a44.38 44.38 0 01-12.59-12 64.46 64.46 0 01-7.5-14.34c-2.31-6-4.47-12.14-6.8-18.18a38.22 38.22 0 00-6.56-11.32c-4.07-4.75-9.41-7.33-15.31-8.85a68.46 68.46 0 00-15-1.88H-.01L.29.12H2.9a85.59 85.59 0 0120.7 2.8c9.34 2.59 17.48 7.16 23.85 14.59a58 58 0 019.89 16.95c2.47 6.35 4.73 12.79 7.19 19.14a38.1 38.1 0 006.56 11.28c4.08 4.74 9.42 7.34 15.36 8.84A75.81 75.81 0 00108 75.54a63.36 63.36 0 0014.17-2c5.74-1.56 10.86-4.15 14.79-8.75a38.21 38.21 0 006.5-11.2c2.09-5.39 4-10.85 6-16.26a68.82 68.82 0 019.29-17.61 45.21 45.21 0 0120.43-15.1A68.64 68.64 0 01198.95.47c2.85-.21 5.71-.31 8.72-.47.11 6.37.21 12.61.32 18.92-2.07.08-4.07.13-6.07.25a56.42 56.42 0 00-15.69 3 27.5 27.5 0 00-15.17 13.17c-2.84 5.15-4.64 10.72-6.64 16.21a127.83 127.83 0 01-6 14.82c-4 7.8-9.29 14.41-16.72 19.12 25.27 16.13 38.66 38.9 37.67 69.13-.68 21-9.34 38.72-25 52.76a75.41 75.41 0 01-108.61-8.06 74.22 74.22 0 01-14.84-29.08 75.54 75.54 0 0111.4-62.65 76 76 0 0124.19-22.01zm37.44 122.23a56.65 56.65 0 10-56.59-56.75 56.67 56.67 0 0056.59 56.75z" />`;
        break;
      case "Gemini":
        // return "./assets/img/gemini.svg";
        return `<path d="M228.17 216.77l-9 11.17c-70-55.4-140-55.77-210.14 0l-9-11.17c17.06-12.32 34-24.25 52.77-33.14 2.52-1.19 3.32-2.6 3.31-5.33q-.12-64.34 0-128.66c0-2.73-.8-4.14-3.32-5.31C34.04 35.6 17.1 23.94.01 11.64L9.01 0c70.06 56.39 140.08 56 210.11 0 3 3.9 5.88 7.61 9 11.67-5.52 3.89-10.65 8-16.22 11.32-12.2 7.38-24.59 14.47-37 21.48-2.09 1.18-3.06 2.26-3.06 4.73q.1 64.73 0 129.45c0 2.72 1.09 3.88 3.35 4.94 18.84 8.9 35.77 20.8 52.98 33.18zm-82.92-43.08V54.2a161.53 161.53 0 01-62.47 0v119.5a204.14 204.14 0 0162.47-.01z" />`;
        break;
      case "Cancer":
        // return "./assets/img/cancer.svg";
        return `<path d="M66.51 85.58a44.38 44.38 0 01-12.59-12 64.46 64.46 0 01-7.5-14.34c-2.31-6-4.47-12.14-6.8-18.18a38.22 38.22 0 00-6.56-11.32c-4.07-4.75-9.41-7.33-15.31-8.85a68.46 68.46 0 00-15-1.88H-.01L.29.12H2.9a85.59 85.59 0 0120.7 2.8c9.34 2.59 17.48 7.16 23.85 14.59a58 58 0 019.89 16.95c2.47 6.35 4.73 12.79 7.19 19.14a38.1 38.1 0 006.56 11.28c4.08 4.74 9.42 7.34 15.36 8.84A75.81 75.81 0 00108 75.54a63.36 63.36 0 0014.17-2c5.74-1.56 10.86-4.15 14.79-8.75a38.21 38.21 0 006.5-11.2c2.09-5.39 4-10.85 6-16.26a68.82 68.82 0 019.29-17.61 45.21 45.21 0 0120.43-15.1A68.64 68.64 0 01198.95.47c2.85-.21 5.71-.31 8.72-.47.11 6.37.21 12.61.32 18.92-2.07.08-4.07.13-6.07.25a56.42 56.42 0 00-15.69 3 27.5 27.5 0 00-15.17 13.17c-2.84 5.15-4.64 10.72-6.64 16.21a127.83 127.83 0 01-6 14.82c-4 7.8-9.29 14.41-16.72 19.12 25.27 16.13 38.66 38.9 37.67 69.13-.68 21-9.34 38.72-25 52.76a75.41 75.41 0 01-108.61-8.06 74.22 74.22 0 01-14.84-29.08 75.54 75.54 0 0111.4-62.65 76 76 0 0124.19-22.01zm37.44 122.23a56.65 56.65 0 10-56.59-56.75 56.67 56.67 0 0056.59 56.75z" />`;
        break;
      case "Leo":
        // return "./assets/img/leo.svg";
        return `<path d="M58.28 97.96c-1.52-3.27-3.07-6.42-4.46-9.63a69.4 69.4 0 01-5.53-20.17 59.14 59.14 0 014.18-29.08c5.73-14 15-24.85 28.51-31.9 10.13-5.32 21-8 32.43-7 20.5 1.77 37 10.8 48.47 28.07a59.51 59.51 0 019.76 27.55 84.6 84.6 0 01-1.73 25.85c-1.95 9.29-5.16 18.18-8.47 27.05-5.39 14.47-12 28.39-18.56 42.32-4.57 9.7-9.07 19.43-12.91 29.45a43.29 43.29 0 00-2.63 22.43 25.63 25.63 0 004.78 11.81c4.23 5.55 9.95 7.85 16.8 7.57 5.68-.23 10.83-2.21 15.73-4.94a55.31 55.31 0 0010.87-8l.7-.64 11.23 11.65c-1.65 1.43-3.22 2.89-4.89 4.23a62.86 62.86 0 01-23.13 12.28c-8.17 2.22-16.33 2.31-24.37-.63-8.81-3.23-15.14-9.28-19.38-17.56-3.92-7.63-5.18-15.83-4.87-24.34s2.73-16.49 5.95-24.31c5.21-12.62 11.12-24.91 16.93-37.25a394.19 394.19 0 0016.85-41.28 101.06 101.06 0 004.89-20.79c1.06-9.12.49-18-3.29-26.58-6.94-15.63-19.15-24.41-35.75-27.35-7.86-1.4-15.47-.3-23 2.46-15.41 5.66-26.21 20.3-28.76 35.65-1.45 8.75 0 17.08 3.18 25.21 2.67 6.82 6.28 13.15 9.85 19.52a197.61 197.61 0 019.48 18.35 68.74 68.74 0 015.63 19.31c2.2 19-4.51 34.13-20.11 45.21a44.42 44.42 0 01-20.92 7.87 47.74 47.74 0 01-13.83-.7c-18.1-3.25-32.39-18.09-36.63-35.62a47.18 47.18 0 0149-57.35c2.45.17 4.87.74 7.3 1.14.22.03.44.09.7.14zm18.86 45.75c-.18-1.84-.33-3.69-.57-5.52a22.41 22.41 0 00-.68-3.47c-4.89-16.73-22.33-25.8-37.94-20.59-11.35 3.78-20.86 12.93-21.82 28a29.13 29.13 0 004.46 17.1c6.81 11.3 18.15 16.66 30.72 14.88 13.15-1.87 26.43-14.39 25.83-30.4z"/>`;
        break;
      case "Virgo":
        // return "./assets/img/virgo.svg";
        return `<path d="M178.98 86.03a22.38 22.38 0 017.58-5.43c4.36-1.76 8.67-1.34 12.91.4a33.81 33.81 0 0113 10.11c6.05 7.25 9.9 15.63 12.47 24.65a86.72 86.72 0 013.17 18.22 138.38 138.38 0 01-5.43 49.47 94.36 94.36 0 01-16.38 31.88c-.14.18-.27.37-.46.63a205.26 205.26 0 0032 26l-10.88 16.57a225 225 0 01-35.39-28.81c-18.37 13.55-39.42 18-61.85 18.23-.16-6.62-.33-13.18-.49-19.84 13.06-.07 25.72-1.73 37.72-6.92a62.85 62.85 0 0011.44-6.45c-.24-.35-.45-.67-.68-1a102.44 102.44 0 01-13.42-23.17 65.18 65.18 0 01-4.66-18.16c-.26-2.63-.4-5.28-.4-7.92v-98.9a22.52 22.52 0 00-2-8.63 111.88 111.88 0 00-20.87-33.1c-.91-1-1.95-1.88-2.94-2.81-.21-.2-.46-.36-.89-.69-1.64 1.72-3.39 3.33-4.88 5.16a92.66 92.66 0 00-16.13 29 35.31 35.31 0 00-2 11.36q.06 65.53 0 131.05v1.32H89.76v-1.21-130a29.85 29.85 0 00-1.72-10.29 109.37 109.37 0 00-18.33-32.77c-.86-1.05-1.87-2-2.78-3a.77.77 0 00-1.31 0c-2.58 2.59-5.36 5-7.72 7.81a94.29 94.29 0 00-14.13 22.5 39.65 39.65 0 00-3.48 11.43 26.55 26.55 0 00-.15 2.67c0 1.46.05 2.91.05 4.36v128.58H20.36V70.01a86.54 86.54 0 00-4.74-29.59 64.39 64.39 0 00-12.3-21.33c-1-1.13-2.15-2.13-3.32-3.27l13-15a66.27 66.27 0 0111.56 13.4 87.52 87.52 0 018.22 15.56c.24-.35.43-.6.6-.87A106.72 106.72 0 0149.29 8.96a35.83 35.83 0 0111-7.66A16 16 0 0175.1 2.44a36.46 36.46 0 018.82 7.6A116.11 116.11 0 0198.78 32.1l.45.82.84-1.54a100.73 100.73 0 0115.61-22.16 33 33 0 0110.41-7.79 16.1 16.1 0 0115 .88 37.67 37.67 0 019.21 7.45 130.52 130.52 0 0125.42 40 40.89 40.89 0 013.32 16.59c-.16 6.11 0 12.23 0 18.35zm14.11 13.93c-.84 1.17-1.7 2.26-2.43 3.42a81.36 81.36 0 00-8.75 19.78 55.65 55.65 0 00-2.92 16.22v26.09a43.75 43.75 0 001.48 11.27 68 68 0 009.4 20c.84 1.28 1.74 2.53 2.72 4 1.3-2.05 2.55-3.91 3.68-5.85 5.61-9.66 8.82-20.16 10.66-31.12a133 133 0 001.7-19.73 81.89 81.89 0 00-1.71-18.62 52.14 52.14 0 00-8-19.37 22.81 22.81 0 00-5.83-6.09z"/>`;
        break;
      case "Libra":
        // return "./assets/img/libra.svg";
        return `<path d="M263.87 147.16H159.81c0-.57-.07-1.07-.07-1.57v-19.83a2.4 2.4 0 011.24-2.31c9.24-6.21 16.84-13.92 21.24-24.31 7.73-18.26 5.66-42.22-12.38-59.24-9.16-8.65-19.79-14-32.39-15.09-17-1.42-31.71 3.69-43.82 15.91-8.27 8.34-13.78 18.11-15.23 29.87-2.39 19.36 3.6 35.58 18.64 48.24 2.08 1.75 4.37 3.26 6.52 4.93a2 2 0 01.81 1.33c.05 7.28 0 14.56 0 22H.11v-24.5h73.07c-.85-.91-1.42-1.51-2-2.13-7.83-8.48-13.75-18.08-16.26-29.44a68.37 68.37 0 018.29-51.28c9.93-16.65 24-28.67 42.38-35.32A78.93 78.93 0 01138.26.26a73.07 73.07 0 0135.64 11.6c14.79 9.68 26.33 22.24 32.53 39 5.26 14.25 6.29 28.83 2 43.55-2.89 9.83-8.24 18.27-15.12 25.78l-1.6 1.7a5.15 5.15 0 00-.39.57c.57 0 1 .1 1.43.1h69.85c.42 0 .85-.08 1.27-.12zM0 220.74v-24.37c.56 0 1-.07 1.48-.07h262.39v24.44z"/>`;
        break;
      case "Scorpio":
        // return "./assets/img/scorpio.svg";
        return `<path d="M168.46 219.86c-4.9-2.64-10-5-14.68-8-10.28-6.48-14.58-16.88-17.7-28-4.84-17.23-6.8-34.89-8.12-52.65-2.38-32-1.19-64-.6-96 .05-2.92-1-3.8-3.6-4.63-8.41-2.64-16.72-4.12-25.35-1-2.36.86-3.4 1.93-3.39 4.6.22 40.27.31 80.55.53 120.82a8.47 8.47 0 001.74 4.65c2.75 3.64 5.79 7.07 9 10.94-9.16 4.75-15 12-18.08 22.15-6.27-4.91-12.08-9.42-17.86-14-6.92-5.46-7.11-5.58-3-13.2a33.41 33.41 0 003.91-16.58c-.23-37.84-.16-75.68-.19-113.52v-5.17c-10.42-1.7-20.57-3.7-29.55 3.57a7.3 7.3 0 00-2.46 5q0 59.61.44 119.2a10.28 10.28 0 001.26 4.53c2.21 4.15 4.63 8.19 7.22 12.7-8.37 4.61-13.42 12-17.82 20.42-1-.73-1.81-1.27-2.54-2-5.37-4.93-10.67-10-16.12-14.81-1.74-1.56-2.63-2.89-1.17-5.11 6.16-9.34 6.62-19.75 6.53-30.59-.3-34.86-.05-69.73 0-104.6v-4.73L0 30.45 14.86 5.29c8.18 4.28 17.33 7.1 27.51 6.07l-2.05 11.4.83.53a44.07 44.07 0 004.04-4.72c3.09-4.74 5.93-9.65 9-14.38.66-1 2.29-2.3 3.13-2.09a87.87 87.87 0 0033.87 1.67v14.4l.94.24L104.39 0c8.27 1.37 16.28 3.24 24.4 3.91s16.39.14 24.91.14c-.52 5.06-1.42 10.62-1.6 16.19-.76 23.89-1.93 47.78-1.74 71.66.13 16.56 1.84 33.15 3.58 49.65 1.61 15.27 4.22 30.45 10.46 44.67a46.3 46.3 0 006.17 10.35c5.54 6.86 12.46 8.1 19.61 2.85a72 72 0 0013.8-13.49c4.73-6 8.48-12.79 12.61-19.27a5.64 5.64 0 00.87-3.58l-26.91 16.89c-.4-3-.31-5.61-1.15-7.91-2.57-7.05 1-10.49 6.51-14.14 17-11.22 33.64-23 50.41-34.57v65.69l-15.13 8.7v-29.45a14.16 14.16 0 00-3.78 4.49c-8.45 13.79-16.85 27.69-29.86 37.79-4.85 3.77-10.71 6.24-16.11 9.31z"/>`;
        break;
      case "Sagittarius":
        // return "./assets/img/sagittarius.svg";
        return `<path d="M69.52 143.48l-51.59 51.71c-6.38 6.39-10.93 7.33-15.22 3.19s-3.48-9 3.17-15.63q23.5-23.52 47.06-47c1.39-1.39 3.32-2.23 5.36-3.56-13.12-13.06-25-24.88-36.84-36.7-.76-.76-1.58-1.48-2.29-2.28-3.54-4-3.51-9.25 0-12.59s8.69-3.17 12.58.68Q48.48 97.84 65 114.57a52.54 52.54 0 013.49 4.24c34.11-34.05 67.58-67.53 101.3-101.25-1.35-.1-2.84-.32-4.33-.32l-59.47.09c-5.8 0-9.58-3.49-9.44-8.69.14-5 3.89-8.29 9.37-8.31Q147.01.18 188.08 0c10.54 0 13 2.47 13 13q-.11 41.1-.2 82.18c0 5.87-3.44 9.6-8.65 9.52s-8.47-4-8.47-9.8V31.99L83.08 132.69c7.32 7.29 15.74 15.67 24.15 24.06 3.57 3.56 7.16 7.1 10.69 10.71 4.76 4.86 5.22 9.93 1.34 13.72s-8.86 3.24-13.71-1.6c-11.86-11.83-23.67-23.71-36.03-36.1z"/>`;
        break;
      case "Capricorn":
        // return "./assets/img/capricorn.svg";
        return `<path d="M37.2 166.06H18.74v-1.19V60.68a67 67 0 00-4.42-25.18C11.17 27.56 6.74 20.5.2 14.85a1.44 1.44 0 01-.2-.27C3.85 9.87 7.71 5.09 11.59.3c8.23 6.87 14.08 15.39 18.55 25.09l.59-.82A89.69 89.69 0 0144.56 7.94a50.05 50.05 0 016.71-5.16c6.22-4 12.59-3.63 18.6.66a63.17 63.17 0 0112.82 12.79 115.26 115.26 0 0115.86 26.08 38.15 38.15 0 013.29 15.37c-.1 21.26 0 42.52 0 63.77a34.8 34.8 0 007.11 21.74 33.12 33.12 0 0010.6 9 7.23 7.23 0 00.68.3v-1.18c.06-6.68-.12-13.37.23-20a43 43 0 018.32-23.77 36.51 36.51 0 0121.88-14.16 50.81 50.81 0 0117.52-.66 43.46 43.46 0 0115.77 4.83 33.72 33.72 0 0115 15.73 44.6 44.6 0 012.64 31.83c-3.14 11-10.11 19.1-20.09 24.6a45.83 45.83 0 01-22.39 5.61h-21.87a.88.88 0 00-1 .74c-7.41 22.74-22.92 37-45.77 43.45a57.11 57.11 0 01-15.51 2H55.73v-18.49h1c6 0 12 .14 18 0q27.18-.76 40.73-24.41a50.19 50.19 0 002.16-4.78c.27-.61.45-1.26.69-1.94-1.24-.52-2.44-1-3.6-1.52-16.25-7.53-26.27-20.09-30.21-37.52a51.11 51.11 0 01-1.12-11.18V57.99a21.05 21.05 0 00-1.79-8.39 92.46 92.46 0 00-9.83-17.17 70.3 70.3 0 00-10.6-12.37c-1.28-1.13-1-1.16-2.38 0a61 61 0 00-10.52 11.7 74.58 74.58 0 00-9.12 16.01 26.64 26.64 0 00-2 10.23c.09 15.56 0 31.13.06 46.7v61.36zm101.52-9.19h20.6a27.76 27.76 0 0011.79-2.56c6.36-3 10.91-7.65 12.84-14.49a27 27 0 00-.91-16.93 16.53 16.53 0 00-10.09-10.12 32.37 32.37 0 00-17.24-1.56 18.53 18.53 0 00-14.31 11.09 32 32 0 00-2.7 13.72v19.84z"/>`;
        break;
      case "Aquarius":
        // return "./assets/img/aquarius.svg";
        return `<path d="M233.15 0l24.88 58.3c-5.35 2.37-10.52 4.64-15.85 7l-16.79-39.84-60.92 39.81-16.94-39.81-60.25 39.81c-5.66-13.33-11.2-26.42-16.88-39.81C50.05 38.78 29.92 51.96 9.54 65.3l-9.41-14L77.95.01c5.75 13.31 11.41 26.43 17.18 39.82L155.67.02c5.67 13.34 11.27 26.49 16.94 39.81zM9.38 172.62l-9.38-14 77.81-51.27 17.18 39.82 60.53-39.81c5.67 13.32 11.26 26.45 16.94 39.81L233 107.35l24.89 58.29-15.85 7c-5.57-13.29-11.09-26.41-16.76-39.86l-60.82 39.82-16.93-39.82-60.25 39.81-17-39.81z"/>`;
        break;
      case "Pisces":
        // return "./assets/img/pisces.svg";
        return `<path d="M22.62 246.23L0 223.95c23.11-23.26 37.24-51.23 41.34-84.78H.65V107.5h40.73c-4-33.81-18-61.83-41.19-85.25L22.94.04c29.08 29.05 46.05 64.84 50.55 107.23h11.07c8.81 0 17.63-.15 26.45.08 3.53.09 4.66-1 5.09-4.58 4.71-39.6 21.27-73.56 49.18-102a8.17 8.17 0 01.9-.73l22.65 22.12c-23.19 23.26-37.27 51.42-41.38 85.17h44.94v31.71h-44.9c4.17 33.56 18.18 61.57 41.36 84.84l-22.55 22.36q-44.12-44.14-50.83-106.9h-42c-4.55 41.7-21.44 77.48-50.85 106.89z"/>`;
        break;
      default:
        console.log("default");
        break;
    }
  }

  bcReport() {
    return `${this.sun}  ${this.moon} ${this.ascendant} ${this.mercury} ${this.venus} ${this.mars}  ${this.jupiter}  ${this.saturn}  ${this.uranus}  ${this.neptune}  ${this._id}`;
  }
}

function uuidv4() {
  return "xxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// BIRTH CHART DATA AS AN ARRAY
// this is the data structure i created the app with, using todo app as a template

const birthChartDataOrig = [
  {
    sun: "Sagittarius",
    moon: "Aries",
    ascendant: "Capricorn",
    mercury: "Leo",
    venus: "Leo",
    mars: "Scorpio",
    jupiter: "Aries",
    saturn: "Pisces",
    uranus: "Pisces",
    neptune: "Aquarius",
    pluto: "Libra",
    descendant: "Taurus",
    _id: "9y2hd",
  },
  {
    sun: "Taurus",
    moon: "Scorpio",
    ascendant: "Leo",
    mercury: "Taurus",
    venus: "Virgo",
    mars: "Virgo",
    jupiter: "Aries",
    saturn: "Pisces",
    uranus: "Sagittarius",
    neptune: "Libra",
    pluto: "Libra",
    descendant: "Aquarius",
    _id: "ks98w",
  },
];

console.log(
  "when we use this birthChartDataOrig everything works",
  birthChartDataOrig,
);

console.log(
  "birthChartDataOrig as a string",
  JSON.stringify(birthChartDataOrig),
);

//LIST OF BIRTH CHARTS CURRENTLY IN PLAY

class BirthChartList {
  list = [];

  // / CONSTRUCTOR WHEN BIRTHCHARTDATA IS AN ARRAY

  constructor(birthChartData) {
    if (!Array.isArray(birthChartData)) {
      throw new Error(
        `birthChartData must be an array. Received ${birthChartData} (${typeof birthChartData})`,
      );
    }
    birthChartData.forEach(
      function (data) {
        console.log("making a birthchart");
        const newBirthChart = new BirthChart(
          data.sun,
          data.moon,
          data.ascendant,
          data.mercury,
          data.venus,
          data.mars,
          data.jupiter,
          data.saturn,
          data.uranus,
          data.neptune,
          data.pluto,
          data.descendant,
          data._id,
        );
        this.list.push(newBirthChart);
      }.bind(this),
    );
  }

  addBirthChart(data) {
    if (!data) throw new Error("No data provided to addBirthChart method");
    const newBirthChart = new BirthChart(
      data.sun,
      data.moon,
      data.ascendant,
      data.mercury,
      data.venus,
      data.mars,
      data.jupiter,
      data.saturn,
      data.uranus,
      data.neptune,
      data.pluto,
      data.descendant,
    );
    this.list.push(newBirthChart);
  }
  getList() {
    return this.list;
  }
  getBirthChartById(id) {
    if (typeof id !== "string" || !id)
      throw new Error("No id provided to getBirthChartById method");
    return this.list.find((birthChart) => birthChart._id === id);
  }
  getBirthChartIndexById(id) {
    if (typeof id !== "string" || !id)
      throw new Error("No id provided to getBirthChartIndexById method");
    return this.list.findIndex((birthChart) => birthChart._id === id);
  }
  deleteBirthChart(id) {
    if (id == null) throw new Error("No id provided to deleteTodo method");

    // Find
    const index = this.list.findIndex(function (birthChart) {
      return birthChart._id === id;
    });

    // Remove
    this.list.splice(index, 1);
  }
  showBirthChart(birthChart) {
    if (typeof birthChart !== "object" || !birthChart)
      throw new Error("No birthChart provided to showBirthChart method");
    console.log("trying to show birthChart", birthChart);
  }
}

// INITATE THE IN PLAY LIST

// toggle between these two to see it working and not...

// const inPlay = new BirthChartList(birthChartDataOrig);
const inPlay = new BirthChartList(birthChartDataArr);

console.log("charts in play", inPlay.getList());

/// RENDER THE LIST

const birthChartSection = document.getElementById("birthchart-section");
const birthChartList = document.getElementById("birthchart-list");

function renderList(list = [], mountNode) {
  const frag = document.createDocumentFragment();

  for (const birthChart of list) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = ` 
    <div id="chart" class="chart">
    <div id="sign" class="sign">Sun in ${birthChart.sun.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.sun.icon}</svg></div>
    <div id="sign" class="sign">Moon in ${birthChart.moon.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.moon.icon}</svg></div>
    <div id="sign" class="sign">Ascendant in ${birthChart.ascendant.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.ascendant.icon}</svg> </div>
    <div id="sign" class="sign">Mercury in ${birthChart.mercury.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.mercury.icon}</svg> </div>
    <div id="sign" class="sign">Venus in ${birthChart.venus.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.venus.icon}</svg> </div>
    <div id="sign" class="sign">Mars in ${birthChart.mars.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.mars.icon}</svg> </div>
    <div id="sign" class="sign">Jupiter in ${birthChart.jupiter.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.jupiter.icon}</svg> </div>
    <div id="sign" class="sign">Saturn in ${birthChart.saturn.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.saturn.icon}</svg> </div>
    <div id="sign" class="sign">Uranus in ${birthChart.uranus.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.uranus.icon}</svg> </div>
    <div id="sign" class="sign">Neptune in ${birthChart.neptune.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.neptune.icon}</svg> </div>
    <div id="sign" class="sign">Pluto in ${birthChart.pluto.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.pluto.icon}</svg> </div>
     <div id="sign" class="sign">Descendant in ${birthChart.descendant.sign} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="sign icon">${birthChart.descendant.icon}</svg> </div>
 </div>
<button class="btn btn-danger delete" data-id="${birthChart._id}">delete</button>
<button class="btn btn-danger show-chart" data-id="${birthChart._id}">show chart</button>
<div id="chart-id" class="chart-id">ID ${birthChart._id}</div>
    `;
    frag.append(li);
  }

  mountNode.innerHTML = "";
  mountNode.append(frag);
}

const list = inPlay.getList();

renderList(list, birthChartList);

// RENDERING THE BIRTH CHART BINGO CARD

function renderChart(chart, mountNode) {
  // Created a document fragment, so we append lis as few times as possible
  const imgfrag = document.createDocumentFragment();
  console.log("chart to be rendered", chart);
  const symbolsToPopulate = [];

  for (const sign in chart) {
    if (chart.hasOwnProperty(sign) && sign != "_id") {
      const currentSign = chart[sign];
      const currentSymbol = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      currentSymbol.setAttribute("viewBox", "0 0 250 250");
      currentSymbol.setAttribute("width", "50");
      currentSymbol.classList.add("sign", "icon", "chart");
      currentSymbol.innerHTML = currentSign.icon;
      currentSymbol.location = currentSign.location;
      gsap.to(
        currentSymbol,
        // duration: 6,
        {
          attr: {
            x: `${currentSymbol.location.x}`,
            y: `${currentSymbol.location.y}`,
          },
        },
      );
      symbolsToPopulate.push(currentSymbol);
    }
  }
  console.log("symbolsToPopulate", symbolsToPopulate);

  ///BINGO CARD USING AN IMG

  // const chartImg = document.createElement("img");
  // console.log("chartImg", chartImg);
  // chartImg.classList.add("bc-template", "materialboxed");
  // chartImg.src = "./assets/img/fake-bc-template.svg";

  ///BINGO CAR USING AN SVG

  const chartImg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  console.log("chartImg", chartImg);
  chartImg.classList.add("bc-template", "materialboxed");
  chartImg.setAttribute("viewBox", "0 0 900 900");
  chartImg.innerHTML = `<defs>
    <clipPath id="a" transform="translate(-51.96 -77.75)">
      <path fill="none" d="M11.03 77.75h977.94V923.2H11.03z"/>
    </clipPath>
  </defs>
  <g clip-path="url(#a)">
    <ellipse cx="459.42" cy="421.72" rx="385.43" ry="385.85" fill="none" stroke="#2b2b2a" stroke-width="1.66"/>
  </g>
  <path d="M700.64 154.01c0-2.45 0-5.43.15-7.24-.75 3-1.74 7-3.28 12.46h-4.17c-1.22-5.09-2.22-9.36-3-12.49.09 1.8.27 4.79.27 7.44v5h-4.49v-15.43h7.2c1 3.49 2 7.29 2.42 9.9.6-2.74 1.59-6.36 2.62-9.9h7.18v15.5h-4.9zm21.76-.94h-8.27v2.58h9.25l-.58 3.58h-13.63v-15.48h13.67v3.58h-8.71v2.16h8.27zm8.34.47v5.71h-4.94v-15.5h9.36c3.84 0 5.85 1.88 5.85 4.45a3.7 3.7 0 01-2.67 3.7c.84.36 2.26 1.1 2.26 3.73v.84a11.76 11.76 0 00.21 2.76h-5a9.38 9.38 0 01-.32-3.2v-.53c0-1.43-.46-2-2.41-2zm0-3.22h3.07c1.37 0 2.14-.5 2.14-1.62s-.7-1.61-2.14-1.61h-3.07zm29 3.66c-.71 3.26-3.33 5.6-8.3 5.6-5.73 0-8.61-3.66-8.61-8.1 0-4.23 2.83-8.08 8.82-8.08 5.25 0 7.72 2.74 8.13 5.54h-5.04c-.22-.86-.86-2.12-3.07-2.12s-3.5 1.84-3.5 4.55c0 2.47.91 4.75 3.52 4.75a2.82 2.82 0 003.08-2.14zm7.35-10.23v9c0 2.46 1.19 3.28 2.84 3.28s2.66-.9 2.66-3.28v-9h5v9c0 4.5-2.5 6.85-7.81 6.85-5.12 0-7.75-2.22-7.75-6.85v-9zm18.95 9.79v5.71h-4.93v-15.5h9.36c3.84 0 5.85 1.88 5.85 4.45a3.71 3.71 0 01-2.67 3.7c.84.36 2.26 1.1 2.26 3.73v.84a11.76 11.76 0 00.21 2.76h-5a9.38 9.38 0 01-.32-3.2v-.53c0-1.43-.46-2-2.41-2zm0-3.22h3.08c1.37 0 2.14-.5 2.14-1.62s-.7-1.61-2.14-1.61h-3.08zm17.31 8.93v-5.37a.93.93 0 00-.23-.6l-6.22-9.51h5.9c1.25 2.23 2.55 4.57 3.3 6.21.74-1.59 2.1-3.88 3.36-6.21h5.4l-6.35 9.66a1 1 0 00-.11.54v5.28z" fill="#2b2b2a"/>
  <g clip-path="url(#a)">
    <path fill="none" stroke="#2b2b2a" stroke-width="1.66" d="M460.66 0v845.45"/>
  </g>
  <path fill="none" stroke="#2b2b2a" stroke-width="1.66" d="M35.73 422.56h844.99M79.37 196.15l743.64 433.68M262.6 787.4L677.64 38.64M255.57 41.09l398.86 750.16M81.86 628.14l749.92-407.17"/>
  <path d="M533.77 46c.33 1 1.13 1.79 3.14 1.79 1.79 0 2.34-.54 2.34-1.31s-.49-1.3-3.39-1.8c-5.72-1-6.54-3-6.54-5 0-3.06 2.88-4.85 7.11-4.85 5.14 0 7.21 2.38 7.41 4.67h-4.89c-.17-.69-.61-1.48-2.53-1.48-1.36 0-2 .44-2 1.17s.65 1 3 1.48c5.85 1 7 2.89 7 5.21 0 3-2.48 5.1-7.74 5.1s-7.5-2.2-8-5zm18.11-10.82v9c0 2.46 1.18 3.28 2.84 3.28s2.65-.91 2.65-3.28v-9h5v9c0 4.5-2.5 6.85-7.82 6.85-5.12 0-7.74-2.22-7.74-6.85v-9zm14 15.48V35.18h5.86c3.43 5.54 4.59 7.55 5.58 9.55h.09c-.14-1.46-.14-4.26-.14-6.82v-2.73h4.53v15.48h-5.53c-1.21-2.15-5-8.74-5.93-10.63h-.08c.15 1.77.16 3.83.16 6.86v3.77zM784.44 332.74l-6-15.48h5.46l2.28 6.95c.83 2.54 1.17 3.89 1.43 5a52.44 52.44 0 011.59-5.22l2.11-6.71h5.4l-6.14 15.48zm27.1-6.16h-8.27v2.59h9.25l-.58 3.57h-13.63v-15.49h13.67v3.58h-8.71v2.16h8.27zm7.92 6.16h-4.54v-15.49h5.86c3.43 5.55 4.59 7.56 5.59 9.55h.08c-.14-1.46-.13-4.25-.13-6.81v-2.74h4.53v15.48h-5.54c-1.21-2.15-5-8.74-5.93-10.62h-.08c.15 1.77.16 3.82.16 6.86v3.76zm19.85-15.49v9c0 2.46 1.18 3.28 2.84 3.28s2.65-.9 2.65-3.28v-9h5v9c0 4.49-2.5 6.84-7.81 6.84-5.13 0-7.75-2.22-7.75-6.85v-9zm17.43 10.82c.32 1 1.12 1.8 3.13 1.8 1.79 0 2.35-.54 2.35-1.31s-.5-1.31-3.4-1.81c-5.72-1-6.54-2.95-6.54-5 0-3.06 2.88-4.84 7.11-4.84 5.14 0 7.21 2.37 7.41 4.66h-4.89c-.17-.69-.61-1.48-2.53-1.48-1.36 0-2 .45-2 1.17s.65 1.05 3 1.49c5.85 1 7 2.88 7 5.21 0 2.95-2.48 5.1-7.74 5.1s-7.5-2.2-8-5zM811.51 522.53c0-2.45 0-5.43.16-7.24-.74 3-1.73 7-3.28 12.46h-4.13c-1.22-5.09-2.22-9.36-3-12.49.1 1.8.27 4.79.27 7.44v5h-4.49v-15.45h7.2c1 3.49 2 7.29 2.42 9.9.59-2.74 1.58-6.36 2.62-9.9h7.18v15.5h-4.91zm12.63 2.33l-1 2.89h-5l5.83-15.5h6.56l6.23 15.48h-5.4l-1.05-2.89zm5-3.58c-1-2.78-1.59-4.54-2-5.84h-.1c-.34 1.28-1 3.48-1.84 5.84zm14.23.77v5.7h-4.94v-15.5h9.36c3.85 0 5.86 1.88 5.86 4.45a3.71 3.71 0 01-2.67 3.7c.83.36 2.25 1.1 2.25 3.73v.83a11.79 11.79 0 00.22 2.77h-5a9.72 9.72 0 01-.31-3.2V524c0-1.44-.46-2-2.41-2zm0-3.21h3.08c1.37 0 2.13-.5 2.13-1.62s-.7-1.61-2.13-1.61h-3.08zm11.94 4.25h5c.33 1 1.12 1.79 3.14 1.79 1.79 0 2.34-.53 2.34-1.3s-.49-1.31-3.4-1.81c-5.71-1-6.53-2.95-6.53-5 0-3.06 2.88-4.85 7.11-4.85 5.14 0 7.21 2.38 7.41 4.67h-4.89c-.18-.69-.61-1.48-2.53-1.48-1.37 0-2 .44-2 1.17s.65 1.05 3 1.49c5.84 1 7 2.88 7 5.21 0 3-2.48 5.1-7.74 5.1s-7.5-2.2-8-5zM688.04 700.76c0 4.31-1.5 6.21-6.14 6.21a16.78 16.78 0 01-2.65-.18v-3.54a13 13 0 001.53.09c1.54 0 2.22-.48 2.22-2.25v-9.92h5zm8.26-9.58v9c0 2.46 1.18 3.27 2.84 3.27s2.65-.9 2.65-3.27v-9h5v9c0 4.49-2.51 6.85-7.82 6.85-5.12 0-7.75-2.23-7.75-6.86v-9zm22.66 0c3.72 0 6.31 1.85 6.31 5s-2.44 5.18-6.29 5.18h-3.74v5.25h-5v-15.43zm-3.69 6.82h2.91c1.35 0 2.14-.55 2.14-1.74 0-1-.6-1.7-2.14-1.7h-2.94zm17.31-6.82v15.47h-5v-15.47zm7.24 3.56h-5.11v-3.56h15.22v3.56h-5.08v11.91h-5zm25.53 5.76h-8.31v2.58h9.24l-.57 3.57h-13.62v-15.47h13.67v3.58h-8.72v2.15h8.27zm8.33.46v5.69h-4.93v-15.47h9.29c3.85 0 5.86 1.88 5.86 4.44a3.73 3.73 0 01-2.67 3.71c.83.35 2.26 1.1 2.26 3.72v.84a11.68 11.68 0 00.21 2.76h-5a9.72 9.72 0 01-.31-3.2v-.52c0-1.44-.46-2-2.41-2zm0-3.22h3.08c1.37 0 2.14-.5 2.14-1.61s-.71-1.62-2.14-1.62h-3.08zM490.09 785.68h5c.33 1 1.12 1.8 3.14 1.8 1.79 0 2.34-.54 2.34-1.31s-.5-1.31-3.4-1.81c-5.71-1-6.54-3-6.54-5 0-3.06 2.88-4.85 7.11-4.85 5.15 0 7.22 2.38 7.42 4.67h-4.89c-.18-.69-.62-1.48-2.53-1.48-1.37 0-2 .45-2 1.17s.64 1 3 1.49c5.84 1 7 2.88 7 5.21 0 2.95-2.49 5.1-7.74 5.1s-7.5-2.2-8-5zm22.82 1.77l-1 2.89h-5l5.86-15.48h6.55l6.24 15.48h-5.4l-1.12-2.89zm5-3.58c-1-2.78-1.6-4.54-2-5.84h-.07c-.34 1.28-1 3.48-1.85 5.84zm11-5.44h-5.1v-3.57h15.23v3.57h-5.08v11.91h-5zm17.22-3.57v9c0 2.46 1.18 3.28 2.84 3.28s2.65-.9 2.65-3.28v-9h5v9c0 4.49-2.5 6.84-7.82 6.84-5.12 0-7.75-2.22-7.75-6.85v-9zm18.91 9.79v5.69h-4.94v-15.48h9.36c3.85 0 5.86 1.88 5.86 4.45a3.71 3.71 0 01-2.67 3.7c.83.36 2.25 1.1 2.25 3.73v.84a11.71 11.71 0 00.22 2.76h-5a9.72 9.72 0 01-.31-3.2v-.52c0-1.44-.46-2-2.41-2zm0-3.22h3.08c1.37 0 2.13-.5 2.13-1.62s-.7-1.61-2.13-1.61h-3.08zm13 8.91v-15.48h5.86c3.43 5.55 4.59 7.56 5.59 9.55h.08c-.14-1.46-.13-4.25-.13-6.81v-2.74h4.6v15.48h-5.54c-1.21-2.15-5-8.74-5.93-10.62h-.08c.15 1.77.16 3.82.16 6.86v3.76zM305.04 788.48v9c0 2.46 1.18 3.28 2.84 3.28s2.65-.9 2.65-3.28v-9h5v9c0 4.5-2.5 6.85-7.82 6.85-5.12 0-7.75-2.22-7.75-6.85v-9zm18.89 9.77v5.7h-4.89v-15.47h9.36c3.85 0 5.85 1.88 5.85 4.45a3.7 3.7 0 01-2.67 3.7c.84.36 2.26 1.1 2.26 3.73v.83a11.28 11.28 0 00.22 2.77h-5a9.38 9.38 0 01-.32-3.2v-.51c0-1.44-.46-2-2.4-2zm0-3.21h3.11c1.37 0 2.13-.5 2.13-1.62s-.7-1.61-2.13-1.61h-3.08zm17.66 6l-1 2.89h-5l5.85-15.48H348l6.24 15.48h-5.41l-1-2.89zm5-3.58c-1-2.78-1.59-4.54-2-5.84h-.08c-.33 1.28-1 3.48-1.84 5.84zm13.82 6.47h-4.54v-15.45h5.86c3.43 5.54 4.59 7.56 5.58 9.55h.09c-.14-1.46-.13-4.26-.13-6.82v-2.73h4.52v15.48h-5.53c-1.21-2.15-5-8.74-5.93-10.62h-.08c.15 1.76.16 3.82.16 6.85v3.77zm19.85-15.48v9c0 2.46 1.18 3.28 2.84 3.28s2.65-.9 2.65-3.28v-9h5v9c0 4.5-2.5 6.85-7.82 6.85-5.12 0-7.75-2.22-7.75-6.85v-9zm12.39 10.82h5c.33 1 1.12 1.79 3.14 1.79 1.79 0 2.34-.53 2.34-1.3s-.5-1.31-3.4-1.81c-5.71-1-6.54-3-6.54-5 0-3.06 2.88-4.85 7.11-4.85 5.15 0 7.22 2.38 7.42 4.67h-4.89c-.18-.69-.62-1.48-2.53-1.48-1.37 0-2 .44-2 1.17s.64 1 3.05 1.49c5.84 1 7 2.88 7 5.21 0 2.95-2.49 5.1-7.74 5.1s-7.5-2.2-8-5zM150.37 689.18h-4.53v-15.47h5.86c3.43 5.54 4.58 7.55 5.58 9.54h.08c-.13-1.45-.13-4.25-.13-6.81v-2.73h4.53v15.47h-5.54c-1.2-2.15-5-8.73-5.93-10.62h-.07c.15 1.77.15 3.82.15 6.86v3.76zm28.25-6.15h-8.27v2.58h9.25l-.58 3.57H165.4v-15.47h13.64v3.54h-8.71v2.16h8.27zm12.09-9.32c3.72 0 6.31 1.85 6.31 5s-2.44 5.18-6.29 5.18h-3.69v5.25h-5v-15.43zm-3.67 6.82h2.91c1.35 0 2.14-.55 2.14-1.73 0-1-.6-1.7-2.14-1.7h-2.91zm16.52-3.28h-5.1v-3.56h15.21v3.56h-5.08v11.91h-5zm17.22-3.56v9c0 2.46 1.18 3.27 2.84 3.27s2.65-.9 2.65-3.27v-9h5v9c0 4.5-2.5 6.85-7.81 6.85-5.13 0-7.75-2.23-7.75-6.85v-9zm18.5 15.47h-4.54v-15.45h5.86c3.44 5.54 4.59 7.54 5.58 9.54h.09c-.14-1.45-.14-4.25-.14-6.81v-2.73h4.53v15.47h-5.53c-1.21-2.15-5-8.73-5.93-10.62h-.08c.15 1.77.16 3.82.16 6.86v3.76zm28.24-6.15h-8.26v2.58h9.24l-.58 3.57H254.3v-15.45h13.66v3.54h-8.7v2.16h8.26zM29.8 494.3c3.72 0 6.31 1.85 6.31 5s-2.44 5.18-6.29 5.18h-3.71v5.25h-5V494.3zm-3.69 6.82h2.93c1.36 0 2.14-.55 2.14-1.73 0-1-.6-1.7-2.14-1.7h-2.93zm12.28-6.82h5v11.89h8.31l-.59 3.58H38.39zm19.94 0v9c0 2.46 1.19 3.27 2.84 3.27s2.66-.9 2.66-3.27v-9h5v9c0 4.5-2.5 6.85-7.81 6.85-5.12 0-7.75-2.23-7.75-6.85v-9zm17.71 3.56h-5.1v-3.56h15.21v3.56h-5.08v11.91h-5zm28.85 4.14c0 4.37-2.89 8.13-9 8.13-5.58 0-8.67-3.57-8.67-8.11 0-4.26 3-8.08 8.9-8.08 5.64 0 8.8 3.67 8.8 8.06zm-12.34 0c0 2.69 1.08 4.68 3.61 4.68s3.43-2.28 3.43-4.59c0-2.69-1-4.66-3.57-4.66s-3.44 1.99-3.44 4.52zM6.04 312.39l-1 2.86h-5l5.86-15.47h6.55l6.2 15.47h-5.4l-1.06-2.88zm5-3.58c-1-2.79-1.6-4.55-2-5.85h-.07c-.34 1.29-1 3.48-1.85 5.85zm8.28 1.81h5c.33 1 1.12 1.79 3.14 1.79 1.79 0 2.34-.54 2.34-1.31s-.49-1.3-3.4-1.81c-5.71-1-6.53-3-6.53-5 0-3.06 2.88-4.84 7.11-4.84 5.14 0 7.21 2.38 7.41 4.67h-4.87c-.18-.69-.61-1.49-2.53-1.49-1.37 0-2 .45-2 1.17s.65 1.05 3 1.49c5.85 1.05 7 2.88 7 5.21 0 2.95-2.48 5.1-7.74 5.1s-7.5-2.2-8-5zm34.53-.6c-.71 3.26-3.33 5.61-8.3 5.61-5.74 0-8.62-3.67-8.62-8.1 0-4.24 2.84-8.09 8.83-8.09 5.25 0 7.72 2.74 8.12 5.55h-5.07a2.77 2.77 0 00-3.07-2.13c-2.35 0-3.5 1.84-3.5 4.56 0 2.46.91 4.74 3.51 4.74a2.82 2.82 0 003.09-2.14zm15.49-.9h-8.3v2.58h9.24l-.58 3.57H56.1V299.8h13.67v3.58h-8.73v2.15h8.27zm7.92 6.15h-4.54V299.8h5.86c3.43 5.54 4.59 7.55 5.58 9.54h.09c-.14-1.45-.14-4.25-.14-6.81v-2.73h4.53v15.45h-5.53c-1.21-2.15-5-8.74-5.93-10.62h-.08c.15 1.77.16 3.82.16 6.86v3.76zm22.86-15.47c5.58 0 8.41 3.41 8.41 7.49 0 4.78-3.5 8-8.46 8h-7.79V299.8zm-2.81 12h2.17c2.5 0 3.74-1.5 3.74-4.39 0-2.37-1-4.11-3.73-4.14h-2.18zm17.78.6l-1 2.88h-5l5.85-15.47h6.56l6.2 15.44h-5.4l-1-2.88zm5-3.58c-1-2.79-1.59-4.55-2-5.85h-.05c-.33 1.29-1 3.48-1.84 5.85zm13.81 6.43h-4.54V299.8h5.86c3.43 5.54 4.59 7.55 5.58 9.54h.09c-.14-1.45-.14-4.25-.14-6.81v-2.73h4.53v15.45h-5.53c-1.21-2.15-5-8.74-5.93-10.62h-.08c.15 1.77.16 3.82.16 6.86v3.76zm18.62-11.91h-5.1v-3.56h15.21v3.56h-5.08v11.91h-5zM109.32 120.34c5.59 0 8.42 3.42 8.42 7.49 0 4.78-3.5 8-8.46 8h-7.8v-15.49zm-2.8 12h2.17c2.5 0 3.74-1.5 3.74-4.39 0-2.37-1-4.11-3.73-4.14h-2.18zm27.18-2.68h-8.27v2.59h9.24l-.57 3.58h-13.63v-15.49h13.67v3.58h-8.71v2.16h8.27zm2.41 1.5h5c.33 1 1.12 1.79 3.14 1.79 1.79 0 2.34-.53 2.34-1.3s-.5-1.31-3.4-1.81c-5.71-1-6.54-3-6.54-5 0-3.06 2.89-4.85 7.11-4.85 5.15 0 7.22 2.38 7.42 4.67h-4.89c-.18-.69-.62-1.48-2.53-1.48-1.37 0-2 .44-2 1.17s.64 1 3 1.49c5.84 1 7 2.88 7 5.21 0 2.95-2.49 5.1-7.74 5.1s-7.5-2.2-8-5zm34.52-.59c-.7 3.26-3.32 5.6-8.29 5.6-5.74 0-8.62-3.66-8.62-8.1 0-4.23 2.84-8.08 8.83-8.08 5.24 0 7.72 2.74 8.12 5.54h-5.07c-.22-.86-.86-2.12-3.07-2.12s-3.49 1.84-3.49 4.55c0 2.47.92 4.75 3.52 4.75a2.82 2.82 0 003.09-2.14zm15.49-.91h-8.26v2.59h9.24l-.58 3.58H172.9v-15.49h13.66v3.58h-8.7v2.16h8.26zm7.92 6.16h-4.53v-15.48h5.86c3.43 5.54 4.58 7.56 5.58 9.55h.09c-.13-1.46-.13-4.26-.13-6.82v-2.73h4.53v15.48h-5.54c-1.2-2.15-5-8.74-5.93-10.62h-.07c.15 1.76.15 3.82.15 6.85v3.77zm22.87-15.48c5.58 0 8.41 3.42 8.41 7.49 0 4.78-3.5 8-8.46 8h-7.82v-15.49zm-2.81 12h2.17c2.5 0 3.74-1.5 3.74-4.39 0-2.37-1-4.11-3.73-4.14h-2.18zm17.78.59l-1 2.89h-5l5.85-15.48h6.56l6.23 15.48h-5.4l-1.08-2.89zm5-3.58c-1-2.78-1.59-4.54-2-5.84h-.08c-.34 1.28-1 3.48-1.84 5.84zm9.28 6.47v-15.48h5.88c3.43 5.54 4.58 7.56 5.58 9.55h.08c-.13-1.46-.13-4.26-.13-6.82v-2.73h4.47v15.48h-5.5c-1.2-2.15-5-8.74-5.93-10.62h-.07c.15 1.76.15 3.82.15 6.85v3.77zm23.16-11.91h-5.11v-3.57h15.22v3.57h-5.08v11.91h-5zM342.52 45.44c0-2.46 0-5.43.15-7.25-.75 3-1.74 7-3.28 12.47h-4.14c-1.21-5.09-2.22-9.37-3-12.5.09 1.81.27 4.8.27 7.45v5h-4.5V35.18h7.21c1 3.49 2 7.29 2.41 9.9.6-2.74 1.59-6.36 2.62-9.9h7.18v15.48h-4.9zm25.28-2.56c0 4.37-2.89 8.13-9 8.13-5.58 0-8.67-3.56-8.67-8.11 0-4.26 3-8.07 8.9-8.07 5.61 0 8.77 3.66 8.77 8.05zm-12.34 0c0 2.69 1.07 4.69 3.61 4.69s3.43-2.28 3.43-4.6c0-2.69-.95-4.66-3.57-4.66s-3.47 1.99-3.47 4.52zm32 0c0 4.37-2.88 8.13-9 8.13-5.58 0-8.67-3.56-8.67-8.11 0-4.26 3-8.07 8.9-8.07 5.58 0 8.73 3.66 8.73 8.05zm-12.33 0c0 2.69 1.07 4.69 3.6 4.69s3.43-2.28 3.43-4.6c0-2.69-.95-4.66-3.56-4.66s-3.51 1.99-3.51 4.52zm19.62 7.83h-4.54V35.18h5.83c3.43 5.54 4.59 7.55 5.58 9.55h.09c-.14-1.46-.14-4.26-.14-6.82v-2.73h4.53v15.48h-5.53c-1.21-2.15-5-8.74-5.93-10.63h-.08c.15 1.77.16 3.83.16 6.86v3.77z" fill="#2b2b2a"/>
`;

  chartImg.append(...symbolsToPopulate);
  imgfrag.append(chartImg);

  mountNode.innerHTML = "";
  mountNode.append(imgfrag);
}

/// DELETE (A - add update)

birthChartList.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.matches("button.delete")) {
    const id = target.dataset.id;
    inPlay.deleteBirthChart(id);
    target.closest("li").remove();
    // } else if (target && target.matches("button.update")) {
    //   console.log("update button clicked");
    //   const id = target.dataset.id;
    //   const todo = jamesTodoList.getTodoById(id);
    //   console.log("todo to be updated", todo);
    //   // const index = jamesTodoList.getTodoIndexById(id);
    //   populate(addForm, todo);
    //   addForm.dataset.updating = "true";
    //   addForm.dataset.id = id;
  } else if (target && target.matches("button.show-chart")) {
    const id = target.dataset.id;
    const chart = inPlay.getBirthChartById(id);
    // console.log('bc to show', bcToShow);
    // const chart = inPlay.showBirthChart(bcToShow);
    console.log("chart", chart);
    const showBirthChartSection = document.getElementById(
      "show-birthchart-section",
    );
    renderChart(chart, showBirthChartSection);
  }
});
