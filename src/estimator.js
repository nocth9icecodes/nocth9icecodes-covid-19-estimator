/* eslint-disable linebreak-style */
const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, totalHospitalBeds, periodType, timeToElapse
  } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;

  let iInfectionsByRequestedTime;
  let siInfectionsByRequestedTime;

  const impact = reportedCases * 10;
  const severeImpact = reportedCases * 50;

  if (periodType === 'days') {
    // For Days
    const dSets = Math.floor(timeToElapse / 3);
    iInfectionsByRequestedTime = impact * 2 ** dSets;
    siInfectionsByRequestedTime = severeImpact * 2 ** dSets;
  }
  if (periodType === 'weeks') {
    // Convert-weeks-to-days
    const wDays = timeToElapse * 7;
    const wSets = Math.floor(wDays / 3);
    iInfectionsByRequestedTime = impact * 2 ** wSets;
    siInfectionsByRequestedTime = severeImpact * 2 ** wSets;
  }
  if (periodType === 'months') {
    // Convert month to weeks
    let mDays = timeToElapse * 4;
    mDays *= 7;
    const mSets = Math.floor(mDays / 3);
    iInfectionsByRequestedTime = impact * 2 ** mSets;
    siInfectionsByRequestedTime = severeImpact * 2 ** mSets;
  }

  // severeCasesByRequestedTime
  const iSevereCasesByRequestedTime = 0.15 * iInfectionsByRequestedTime;
  const siSevereCasesByRequestedTime = 0.15 * siInfectionsByRequestedTime;

  // hospitalBedsByRequestedTime
  let iHospitalBedsByRequestedTime = Math.floor(0.35 * totalHospitalBeds);
  iHospitalBedsByRequestedTime -= iSevereCasesByRequestedTime;

  let siHospitalBedsByRequestedTime = Math.floor(0.35 * totalHospitalBeds);
  siHospitalBedsByRequestedTime -= siSevereCasesByRequestedTime;

  // casesForICUByRequestedTime
  const iCasesForICUByRequestedTime = 0.05 * iInfectionsByRequestedTime;
  const isCasesForICUByRequestedTime = 0.05 * siInfectionsByRequestedTime;

  // casesForVentilatorsByRequestedTime
  const iCasesForVentilatorsByRequestedTime = Math.floor(
    0.02 * iInfectionsByRequestedTime
  );
  const siCasesForVentilatorsByRequestedTime = Math.floor(
    0.02 * siInfectionsByRequestedTime
  );

  // dollarsInFlight
  const iDollarsInFlight = Math.floor(
    (iInfectionsByRequestedTime * avgDailyIncomeInUSD * avgDailyIncomePopulation) / timeToElapse
  );
  const siDollarsInFlight = Math.floor((siInfectionsByRequestedTime * avgDailyIncomeInUSD
    * avgDailyIncomePopulation) / timeToElapse);

  return {
    data: {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
      },
      impact: {
        currentlyInfected: impact,
        infectionsByRequestedTime: iInfectionsByRequestedTime,
        severeCasesByRequestedTime: iSevereCasesByRequestedTime,
        hospitalBedsByRequestedTime: iHospitalBedsByRequestedTime,
        casesForICUByRequestedTime: iCasesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: iCasesForVentilatorsByRequestedTime,
        dollarsInFlight: iDollarsInFlight
      },
      severeImpact: {
        currentlyInfected: severeImpact,
        infectionsByRequestedTime: siInfectionsByRequestedTime,
        severeCasesByRequestedTime: siSevereCasesByRequestedTime,
        hospitalBedsByRequestedTime: siHospitalBedsByRequestedTime,
        casesForICUByRequestedTime: isCasesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: siCasesForVentilatorsByRequestedTime,
        dollarsInFlight: siDollarsInFlight
      }
    }
  };
};

module.exports = covid19ImpactEstimator;
