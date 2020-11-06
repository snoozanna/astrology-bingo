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
  ) {
    this.sun = {
      sign: sun,
      icon: BirthChart.getIconUrl(sun),
    };
    this.moon = {
      sign: moon,
      icon: BirthChart.getIconUrl(moon),
    };
    this.ascendant = {
      sign: ascendant,
      icon: BirthChart.getIconUrl(ascendant),
    };
    this.mercury = {
      sign: mercury,
      icon: BirthChart.getIconUrl(mercury),
    };
    this.venus = {
      sign: venus,
      icon: BirthChart.getIconUrl(venus),
    };
    this.mars = {
      sign: mars,
      icon: BirthChart.getIconUrl(mars),
    };
    this.jupiter = {
      sign: jupiter,
      icon: BirthChart.getIconUrl(jupiter),
    };
    this.saturn = {
      sign: saturn,
      icon: BirthChart.getIconUrl(saturn),
    };
    this.uranus = {
      sign: uranus,
      icon: BirthChart.getIconUrl(uranus),
    };
    this.neptune = {
      sign: neptune,
      icon: BirthChart.getIconUrl(neptune),
    };
    this.pluto = {
      sign: pluto,
      icon: BirthChart.getIconUrl(pluto),
    };
    this.descendant = {
      sign: descendant,
      icon: BirthChart.getIconUrl(descendant),
    };

    // this.moon.icon = BirthChart.getIcon(moon);
    this._id = uuidv4();
  }
  //need to call getIcons when new birth chart is made??e
  static getIconUrl(sign) {
    switch (sign) {
      case 'Aries':
        return './assets/img/aries.svg';
        break;
      case 'Taurus':
        return './assets/img/taurus.svg';
        break;
      case 'Gemini':
        return './assets/img/gemini.svg';
        break;
      case 'Cancer':
        return './assets/img/cancer.svg';
        break;
      case 'Leo':
        return './assets/img/leo.svg';
        break;
      case 'Virgo':
        return './assets/img/virgo.svg';
        break;
      case 'Libra':
        return './assets/img/libra.svg';
        break;
      case 'Scorpio':
        return './assets/img/scorpio.svg';
        break;
      case 'Sagittarius':
        return './assets/img/sagittarius.svg';
        break;
      case 'Capricorn':
        return './assets/img/capricorn.svg';
        break;
      case 'Aquarius':
        return './assets/img/aquarius.svg';
        break;
      case 'Pisces':
        return './assets/img/pisces.svg';
        break;
      default:
        console.log('default');
        break;
    }
  }

  bcReport() {
    return `${this.sun}  ${this.moon} ${this.ascendant} ${this.mercury} ${this.venus} ${this.mars}  ${this.jupiter}  ${this.saturn}  ${this.uranus}  ${this.neptune}  ${this.id}`;
  }
}

function uuidv4() {
  return 'xxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const birthChartData = [
  {
    sun: 'Sagittarius',
    moon: 'Aries',
    ascendant: 'Capricorn',
    mercury: 'Leo',
    venus: 'Leo',
    mars: 'Scorpio',
    jupiter: 'Aries',
    saturn: 'Pisces',
    uranus: 'Pisces',
    neptune: 'Aquarius',
    pluto: 'Libra',
    descendant: 'Taurus',
  },
  {
    sun: 'Taurus',
    moon: 'Scorpio',
    ascendant: 'Leo',
    mercury: 'Taurus',
    venus: 'Virgo',
    mars: 'Virgo',
    jupiter: 'Aries',
    saturn: 'Pisces',
    uranus: 'Sagittarius',
    neptune: 'Libra',
    pluto: 'Libra',
    descendant: 'Aquarius',
  },
];

////LIST

class BirthChartList {
  #list = [];
  constructor(birthChartData) {
    birthChartData.forEach(
      function (data) {
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
        this.#list.push(newBirthChart);
      }.bind(this),
    );
  }
  addBirthChart(data) {
    if (!data) throw new Error('No data provided to addBirthChart method');
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
    this.#list.push(newBirthChart);
  }
  getList() {
    return this.#list;
  }
  getBirthChartById(id) {
    if (typeof id !== 'string' || !id)
      throw new Error('No id provided to getBirthChartById method');
    return this.#list.find((birthChart) => birthChart._id === id);
  }
  getBirthChartIndexById(id) {
    if (typeof id !== 'string' || !id)
      throw new Error('No id provided to getBirthChartIndexById method');
    return this.#list.findIndex((birthChart) => birthChart._id === id);
  }
  deleteBirthChart(id) {
    if (id == null) throw new Error('No id provided to deleteTodo method');

    // Find
    const index = this.#list.findIndex(function (birthChart) {
      return birthChart._id === id;
    });

    // Remove
    this.#list.splice(index, 1);
  }
  showBirthChart(birthChart) {
    if (typeof birthChart !== 'object' || !birthChart)
      throw new Error('No birthChart provided to showBirthChart method');
    console.log('trying to show birthChart');
    // a function here to populate the template with the birth chart object
  }
}

const inPlay = new BirthChartList(birthChartData);
console.log('charts in play', inPlay.getList());

////READ

const birthChartSection = document.getElementById('birthchart-section');
const birthChartList = document.getElementById('birthchart-list');

/// render list

function renderList(list = [], mountNode) {
  // Created a document fragment, so we append lis as few times as possible
  const frag = document.createDocumentFragment();

  for (const birthChart of list) {
    // showSymbol(birthChart);
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = ` 
    <div id="chart" class="chart">
    <div id="sign" class="sign">Sun in ${birthChart.sun.sign} <img src="${birthChart.sun.icon}"  class="sign icon"> </div>
    <div id="sign" class="sign">Moon in ${birthChart.moon.sign} <img src="${birthChart.moon.icon}"  class="sign icon"> </div>
    <div id="sign" class="sign">Ascendant in ${birthChart.ascendant.sign} <img src="${birthChart.ascendant.icon}"  class="sign icon"> </div>
    <div id="sign" class="sign">Mercury in ${birthChart.mercury.sign} <img src="${birthChart.mercury.icon}"  class="sign icon"> </div>
    <div id="sign" class="sign">Venus in ${birthChart.venus.sign} <img src="${birthChart.venus.icon}"  class="sign icon"> </div>
    <div id="sign" class="sign">Mars in ${birthChart.mars.sign} <img src="${birthChart.mars.icon}"  class="sign icon"> </div>
    <div id="sign" class="sign">Jupiter in ${birthChart.jupiter.sign} <img src="${birthChart.jupiter.icon}"  class="sign icon"> </div>
    <div id="sign" class="sign">Saturn in ${birthChart.saturn.sign} <img src="${birthChart.saturn.icon}"  class="sign icon"> </div>
    <div id="sign" class="sign">Uranus in ${birthChart.uranus.sign} <img src="${birthChart.uranus.icon}"  class="sign icon"> </div>
    <div id="sign" class="sign">Neptune in ${birthChart.neptune.sign} <img src="${birthChart.neptune.icon}"  class="sign icon"> </div>
    <div id="sign" class="sign">Pluto in ${birthChart.pluto.sign} <img src="${birthChart.pluto.icon}"  class="sign icon"> </div>
 </div>
<button class="btn btn-danger delete" data-id="${birthChart._id}">delete</button>
<button class="btn btn-danger show-chart" data-id="${birthChart._id}">show chart</button>
<div id="chart-id" class="chart-id">ID ${birthChart._id}</div>
    `;
    frag.append(li);
  }

  mountNode.innerHTML = '';
  mountNode.append(frag);
}

const list = inPlay.getList();
console.log('list', list);

renderList(list, birthChartList);

// render chart - DOES IT GO HERE?

function renderChart(chart, mountNode) {
  // Created a document fragment, so we append lis as few times as possible
  const imgfrag = document.createDocumentFragment();

  const chartImg = document.createElement('img');
  chartImg.classList.add('birth-chart-img', 'materialboxed');
  chartImg.src = '/assets/img/fake-bc-template.svg';
  console.log('chartImg', chartImg);
  imgfrag.append(chartImg);

  mountNode.innerHTML = '';
  mountNode.append(imgfrag);
}

// const chart = inPlay.showBirthChart();
// console.log("chart", chart);

// renderChart(chart, showBirthChartSection);

/// DELETE (A - add update)

birthChartList.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.matches('button.delete')) {
    const id = target.dataset.id;
    inPlay.deleteBirthChart(id);
    target.closest('li').remove();
    // } else if (target && target.matches("button.update")) {
    //   console.log("update button clicked");
    //   const id = target.dataset.id;
    //   const todo = jamesTodoList.getTodoById(id);
    //   console.log("todo to be updated", todo);
    //   // const index = jamesTodoList.getTodoIndexById(id);
    //   populate(addForm, todo);
    //   addForm.dataset.updating = "true";
    //   addForm.dataset.id = id;
  } else if (target && target.matches('button.show-chart')) {
    const id = target.dataset.id;
    const bcToShow = inPlay.getBirthChartById(id);
    console.log('bc to show', bcToShow);
    // inPlay.showBirthChart(bcToShow);
    const chart = inPlay.showBirthChart(bcToShow);
    console.log('chart', chart);
    const showBirthChartSection = document.getElementById(
      'show-birthchart-section',
    );
    renderChart(chart, showBirthChartSection);
  }
});

// SHOW CHART
