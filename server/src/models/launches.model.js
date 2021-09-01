
const launches = new Map();

const launch = {
  launchNumber: 100,
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

module.exports = {
  getAllLaunches,
};