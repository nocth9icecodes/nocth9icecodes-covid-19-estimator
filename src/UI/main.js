const formEstimate = document.querySelector('#form-estimate');
const population = document.querySelector('#data-population');
const timeToElapse = document.querySelector('#data-time-to-elapse');
const reportedCase = document.querySelector('#data-reported-cases');
const hospitalBeds = document.querySelector('#data-hospital-beds');
const periodType = document.querySelector('#data-period-type');

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      // eslint-disable-next-line
      alert('All field are required');
    }
  });
}

formEstimate.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([population, timeToElapse, reportedCase, hospitalBeds, periodType]);
});
