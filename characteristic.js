var util = require('util');
var bleno = require('bleno');

function DENSeCharacteristic() {
  bleno.Characteristic.call(this, {
    uuid: '20000000-0000-0000-0000-000000000001'.replace(/\-/gi, ''),
    properties: ['read', 'write', 'notify', 'writeWithoutResponse'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'DENSe protocol',
      }),
    ],
  });
  this._tmpMessages = null;
  this._updateValueCallback = null;
}

util.inherits(DENSeCharacteristic, bleno.Characteristic);

DENSeCharacteristic.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
  console.log('inbound write req');

  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
    return;
  }

  if (data.length === 0) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    return;
  }

  // if subscription active, notify every write request
  if (this._updateValueCallback) {
    this._updateValueCallback(data);
  }

  // store data, then write response
  this._tmpMessages = data;
  console.log('storing messages:', data.toString());
  callback(this.RESULT_SUCCESS);
};

DENSeCharacteristic.prototype.onReadRequest = function (offset, callback) {
  console.log('incoming read req');

  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
    return;
  }

  // get data, then write response
  const data = this._tmpMessages ? this._tmpMessages.toString() : 'you have no messages stored';
  console.log('getting messages:', data);
  callback(this.RESULT_SUCCESS, Buffer.from(data, 'utf8'));
};

// handle on subscribe
DENSeCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
  console.log('on subscribe');

  this._updateValueCallback = updateValueCallback;
};

// handle on unsubscribe
DENSeCharacteristic.prototype.onUnsubscribe = function () {
  console.log('on unsubscribe');

  this._updateValueCallback = null;
};

module.exports = DENSeCharacteristic;