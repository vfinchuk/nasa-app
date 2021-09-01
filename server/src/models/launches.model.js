
const launches = new Map();

let latestLaunchNumber = 100;

const launch = {
  launchNumber: latestLaunchNumber,
  mission: 'Kepler exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customers: ['NASA', 'ZTM'],
  upcoming: true,
  success: true,
}

launches.set(launch.launchNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestLaunchNumber++;
  launches.set(latestLaunchNumber, Object.assign(launch, {
    launchNumber: latestLaunchNumber,
    customers: ['NASA', 'Zero to Mastery'],
    upcoming: true,
    success: true,
  }))
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
};