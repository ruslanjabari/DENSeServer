var util = require('util');
var bleno = require('bleno');

const DENSeCharacteristic = require('./characteristic');

// create food bank service, then register food bank characteristic to it
function DENSeService() {
  bleno.PrimaryService.call(this, {
    uuid: '10000000-0000-0000-0000-000000000001'.replace(/\-/gi, ''),
    characteristics: [new DENSeCharacteristic()],
  });
}

util.inherits(DENSeService, bleno.PrimaryService);

module.exports = DENSeService;
