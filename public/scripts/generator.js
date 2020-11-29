const planets = [
  "Sun",
  "Moon",
  "Ascendant",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
  "Descendant",
];

const signs = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const potentialCallList = [];
const alreadyCalled = [];

/// FNS TO GET RANDOM SIGN/PLANET

function getRandomPlanetIndex() {
  const planetLimit = planets.length;
  let planetIndexToCall = Math.floor(Math.random() * planetLimit).toFixed(0);
  return planetIndexToCall;
}

function getRandomPlanet() {
  const Rn = getRandomPlanetIndex();
  let planetToCall = planets[Rn];
  // console.log("planetToCall", planetToCall);
  return planetToCall;
}

function getRandomSignIndex() {
  const signLimit = signs.length;
  let signIndexToCall = Math.floor(Math.random() * signLimit).toFixed(0);
  return signIndexToCall;
}

function getRandomSign() {
  const Rn = getRandomSignIndex();
  let signToCall = signs[Rn];
  // console.log("signToCall", signToCall);
  return signToCall;
}

// function checkCall(newCall) {
//   console.log('checking already called', alreadyCalled);
//   console.log(
//     `is ${newCall} in the list already?`,
//     alreadyCalled.includes(newCall),
//   );
//   return alreadyCalled.includes(newCall);
// }

function checkCall(newCall) {
  console.log("checking:", newCall);
  for (let i = 0; i < alreadyCalled.length; i++) {
    if (alreadyCalled[i][0] == newCall[0]) {
      if (alreadyCalled[i][1] == newCall[1]) {
        console.log("This one's been called");
        return true;
      }
    }
  }
  return false;
}

function addToGrid(newCall) {
  // const item = document.getElementsByClassName(`${newCall[0]} ${newCall[1]}`);
  const planet = newCall[0];
  const sign = newCall[1];
  console.log(planet, sign);
  const item = document.getElementsByClassName(`${planet} ${sign}`);

  // item.classList.add("called");
  console.log("item", item);
}

addToGrid(["Sun", "Virgo"]);

{
  /* <div class="grid-item aries pluto">PLUTO</div>;
<div class="grid-item virgo sun">SUN</div>;
<div class="grid-item libra mars">MARS</div>;

const alreadyCalled = [
  ["Sun", "Virgo"],
  ["Mercury", "Leo"],
  ["Mars", "Scorpio"],
]; */
}

function checkGrid(alreadyCalled) {
  for (const call of alreadyCalled) {
    const planet = call[0].toLowerCase();
    const sign = call[1].toLowerCase();
    const item = document.querySelector(`.${planet}.${sign}`);
    item.classList.add("called");

    if (!item.innerHTML) {
      item.innerHTML += `<p>${call[0]} in ${call[1]}</p>`;
    } else {
      continue;
    }
    // // console.log("item", item);
  }
}

const callSection = document.getElementById("call-section");
// const calledList = document.getElementById("already-called");

callSection.addEventListener("click", (e) => {
  const target = e.target;
  const calledListMount = document.getElementById("already-called");
  const currentCallMount = document.getElementById("current-call");
  if (target && target.matches("button.new-call")) {
    const newCall = [getRandomPlanet(), getRandomSign()];
    if (checkCall(newCall) === false) {
      console.log("new call", newCall);
      alreadyCalled.push(newCall);
      checkGrid(alreadyCalled);
      console.log("alreadyCalled", alreadyCalled);
      renderCall(newCall, currentCallMount);
      renderList(alreadyCalled, calledListMount);
    } else {
      /// call again
      console.log("need to call again");
    }
  }
});

function renderList(list, mountNode) {
  // Created a document fragment, so we append lis as few times as possible
  const frag = document.createDocumentFragment();
  for (const call of list) {
    const li = document.createElement("li");
    li.classList.add("called-list-item");
    li.innerHTML = ` ${call[0]} in ${call[1]}`;
    frag.append(li);
  }
  mountNode.innerHTML = "";
  mountNode.append(frag);
}

function renderCall(call, mountNode) {
  // Created a document fragment, so we append lis as few times as possible
  const callFrag = document.createDocumentFragment();
  const justCalled = document.createElement("h3");
  justCalled.classList.add("just-called");
  justCalled.innerHTML = ` ${call[0]} in ${call[1]}`;
  callFrag.append(justCalled);

  mountNode.innerHTML = "";
  mountNode.append(callFrag);
}
