var util = require('util');
var bleno = require('bleno');

const {
  DENSeCharacteristic1,
  DENSeCharacteristic2,
  DENSeCharacteristic3,
} = require('./characteristic');

// create food bank service, then register food bank characteristic to it
function DENSeService() {
  bleno.PrimaryService.call(this, {
    uuid: '10000000-0000-0000-0000-000000000001'.replace(/\-/gi, ''),
    characteristics: [
      new DENSeCharacteristic1(),
      new DENSeCharacteristic2(),
      new DENSeCharacteristic3(),
    ],
  });
}

util.inherits(DENSeService, bleno.PrimaryService);

module.exports = DENSeService;
