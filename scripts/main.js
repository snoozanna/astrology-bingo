class BirthChart {
  constructor(sun, rising, moon) {
    this.sun = {
      sign: sun,
      icon: BirthChart.getIconUrl(sun),
    };
    // this.sun.icon = BirthChart.getIcon(sun);
    this.rising = {
      sign: rising,
      icon: BirthChart.getIconUrl(rising),
    };
    // this.rising.icon = BirthChart.getIcon(rising);
    this.moon = {
      sign: moon,
      icon: BirthChart.getIconUrl(moon),
    };
    // this.moon.icon = BirthChart.getIcon(moon);
    this._id = uuidv4();
  }
  //need to call getIcons when new birth chart is made??e
  static getIconUrl(sign) {
    switch (sign) {
      case 'Aries':
        return './assets/img/aries.png';
        break;
      case 'Taurus':
        return './assets/img/taurus.png';
        break;
      case 'Cancer':
        return './assets/img/cancer.png';
        break;
      case 'Leo':
        return './assets/img/leo.png';
        break;
      case 'Virgo':
        return './assets/img/virgo.png';
        break;
      case 'Libra':
        return './assets/img/libra.png';
        break;
      case 'Scorpio':
        return './assets/img/scorpio.png';
        break;
      case 'Sagittarius':
        return './assets/img/sagittarius.png';
        break;
      case 'Capricorn':
        return './assets/img/capricorn.png';
        break;
      case 'Pisces':
        return './assets/img/pisces.png';
        break;
      default:
        console.log('default');
        break;
    }
  }

  bcReport() {
    return `${this.sun} ${this.rising} ${this.moon} ${this.id}`;
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
    rising: 'Capricorn',
    moon: 'Aries',
  },
  {
    sun: 'Taurus',
    rising: 'Leo',
    moon: 'Scorpio',
  },
];

////LIST

class BirthChartList {
  #list = [];
  constructor(birthChartData) {
    birthChartData.forEach(
      function (data) {
        const newBirthChart = new BirthChart(data.sun, data.rising, data.moon);
        this.#list.push(newBirthChart);
        // this.#list.push(newBirthChart);
      }.bind(this),
    );
  }
  addBirthChart(data) {
    if (!data) throw new Error('No data provided to addBirthChart method');
    const newBirthChart = new BirthChart(data.sun, data.rising, data.moon);
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

  showBirthChart(id) {
    if (typeof id !== 'string' || !id)
      throw new Error('No id provided to showBirthChart method');
    /// this will turn the birthchart data into relevant object and associate symbols
    console.log(
      'working out what needs text and symbols need to populate the template chart',
    );
  }
}

const inPlay = new BirthChartList(birthChartData);
console.log('charts in play', inPlay.getList());

////READ

const birthChartSection = document.getElementById('birthchart-section');
const birthChartList = document.getElementById('birthchart-list');
const showBirthChartSection = document.getElementById(
  'show-birthchart-section',
);

/// render list

function renderList(list = [], mountNode) {
  // Created a document fragment, so we append lis as few times as possible
  const frag = document.createDocumentFragment();

  for (const birthChart of list) {
    // showSymbol(birthChart);
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = ` <div id="chart" class="chart">Sun in ${birthChart.sun.sign} <img src="${birthChart.sun.icon}"  class="sign icon"> </div>
<div id="sign" class="sign">Ascendant in ${birthChart.rising.sign} <img src="${birthChart.rising.icon}"  class="sign icon"> </div> </div>
<div id="sign" class="sign">Moon in ${birthChart.moon.sign} <img src="${birthChart.moon.icon}"  class="sign icon"> </div>
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

// render chart

function renderChart(chart, mountNode) {
  // Created a document fragment, so we append lis as few times as possible
  const imgfrag = document.createDocumentFragment();

  const chartImg = document.createElement('img');
  chartImg.classList.add('birth-chart-img', 'materialboxed');
  chartImg.src = '/assets/img/fake-bc-template.svg';
  console.log('chartImg', chartImg);
  imgfrag.append(chartImg);

  mountNode.innerHTML = '';
  mountNode.append(frag);
}

const chart = inPlay.showBirthChart();
console.log('chart', chart);

renderChart(chart, showBirthChartSection);

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
    console.log('show button clicked', target);
    const id = target.dataset.id;
    console.log('id', id);
    inPlay.showBirthChart(id);
  }
});

// SHOW CHART
