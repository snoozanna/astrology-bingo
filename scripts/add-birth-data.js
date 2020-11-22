document.addEventListener('DOMContentLoaded', function () {
  const options = {
    format: 'yyyymmdd',
    autoClose: true,
    // onOpenEnd: function(){....}
  };
  const elems = document.querySelectorAll('.datepicker');
  const instance = M.Datepicker.init(elems, options);
  console.log('instance date', instance);
});

document.addEventListener('DOMContentLoaded', function () {
  const options = {
    twelveHour: false,
    autoClose: true,
  };
  const elems = document.querySelectorAll('.timepicker');
  const instances = M.Timepicker.init(elems, options);
  console.log('instance time', instances);
});

const myForm = document.getElementById('add-data-form');
const submitButton = document.getElementById('add-data');

myForm.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('data', myForm.data);
  // use the decodeURIComponent('06%3A26') thing here
});

myForm.submitButton('click', function (e) {
  e.preventDefault();
  console.log('data', myForm.data);
  // use the decodeURIComponent('06%3A26') thing here
});
