/* eslint-disable linebreak-style */
const formEstimate = document.querySelector('#form-estimate');
const popuLation = document.querySelector('#data-population');
const TimeToElapse = document.querySelector('#data-time-to-elapse');
const ReportedCase = document.querySelector('#data-reported-cases');
const HospitalBeds = document.querySelector('#data-hospital-beds');
const PeriodType = document.querySelector('#data-period-type');

function submitData() {
  const population = popuLation.value;
  const timeToElapse = TimeToElapse.value;
  const reportedCases = ReportedCase.value;
  const totalHospitalBeds = HospitalBeds.value;
  const periodType = PeriodType.value;

  const data = {
    population,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    periodType
  };
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/v1/on-covid-19');

  xhr.onload = () => {
  // eslint-disable-next-line
  console.log('Submitted', this.responseText);
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}

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
  if (popuLation.value === '' && TimeToElapse.value === '' && ReportedCase.value === '' && HospitalBeds.value === '' && PeriodType.value === '') {
    checkRequired([popuLation, TimeToElapse, ReportedCase, HospitalBeds, PeriodType]);
  } else {
    submitData();
  }
});
