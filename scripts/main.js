class BirthChart {
  constructor(sun, rising, moon) {
    this.sun = sun;
    this.rising = rising;
    this.moon = moon;
    this._id = uuidv4();
  }

  bcReport() {
    return `${this.sun} ${this.rising} ${this.moon} ${this.id}`;
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const firstBC = new BirthChart('sag', 'virgo', 'aries');
console.log('firstBC', firstBC);

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
}

const inPlay = new BirthChartList(birthChartData);
console.log('charts in play', inPlay.getList());

////READ

const birthChartSection = document.getElementById('birthchart-section');
const birthChartList = document.getElementById('birthchart-list');

function render(list = [], mountNode) {
  // Created a document fragment, so we append lis as few times as possible
  const frag = document.createDocumentFragment();

  for (const birthChart of list) {
    showSymbol(birthChart);
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
<div id="sign" class="sign">Sun in ${birthChart.sun} ${birthChart.symbol} </div>
<div id="sign" class="sign">Ascendant in ${birthChart.rising} </div>
<div id="sign" class="sign">Moon in ${birthChart.moon} </div>
<button class="btn btn-danger delete" data-id="${birthChart._id}">delete</button>
<button class="btn btn-danger show-chart" data-id="${birthChart._id}">show chart</button>
    `;
    frag.append(li);
  }

  mountNode.innerHTML = '';
  mountNode.append(frag);
}

const list = inPlay.getList();
console.log('list', list);

render(list, birthChartList);

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
  }
});

// SHOW CHART

// function showSymbol(birthChart) {
//   for (const sign of Object.keys(birthChart)) {
//     const showSymbol = birthChart[i];
//     switch (showSymbol) {
//       case 'aries':
//         symbol = './assets/img/aries.png';
//         break;
//       case 'taurus':
//         symbol = './assets/img/taurus.png';
//         break;
//       case 'cancer':
//         symbol = './assets/img/cancer.png';
//         break;
//       case 'leo':
//         symbol = './assets/img/leo.png';
//         break;
//       case 'virgo':
//         symbol = './assets/img/virgo.png';
//         break;
//     }
//   }
// }
