var bleno = require('bleno');

const DENSeService = require('./service');

const name = 'DENSe Instance';
const _DENSeService = new DENSeService();

// wait until the BLE radio powers on before attempting to advertise.
// if BLE radio is unavailable, then this event will never be called.
bleno.on('stateChange', function (state) {
  if (state === 'poweredOn') {
    console.log('on');
    // start to advertise service id, making it easie to find.
    bleno.startAdvertising(name, [_DENSeService.uuid], function (err) {
      if (err) {
        console.log('start advertising error', err);
      }
    });

    return;
  }

  bleno.stopAdvertising();
});

// handle on advertising start event
bleno.on('advertisingStart', function (err) {
  if (err) {
    console.log('start advertising error', err);
    return;
  }

  // once we are advertising, it's time to set up our services,
  // along with our characteristics.
  console.log('advertising...');
  bleno.setServices([_DENSeService]);
});
