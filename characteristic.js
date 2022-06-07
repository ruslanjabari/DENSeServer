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
  this._tmpMessages = '';
  this._firstHalf = '';
  this_secondHalf = '';
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

  if (data.toString().includes('header-1')) {
    this._firstHalf = data.toString();
    console.log('first half:', this._firstHalf);
    callback(this.RESULT_SUCCESS);
    return;
  }

  if (data.toString().includes('header-2')) {
    this._secondHalf = data.toString();
    console.log('second half:', this._secondHalf);
    callback(this.RESULT_SUCCESS);
    return;
  }

  // store data, then write response
  if (data.toString().includes('{') && data.toString().includes('header')) {
    this._tmpMessages = data;
  } else {
    this._tmpMessages += data;
  }
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
  if (!this._tmpMessages && !this._firstHalf && !this._secondHalf) {
    console.log('you have no messages stored');
    callback(this.RESULT_SUCCESS, Buffer.from('EOF', 'utf8'));
  } else {
    if (this._firstHalf) {
      console.log('sending first half');
      callback(this.RESULT_SUCCESS, Buffer.from(this._firstHalf, 'utf8'));
      if (this._secondHalf) {
        console.log('sending second half');
        callback(this.RESULT_SUCCESS, Buffer.from(this._secondHalf, 'utf8'));
      }
      return; // tmp
    }

    if (this._tmpMessages) {
      console.log('sending stored messages');
      callback(this.RESULT_SUCCESS, Buffer.from(this._tmpMessages, 'utf8'));
    }
    // const data = this._tmpMessages.toString();
    // console.log('getting messages:', data);
    // data.replace('undefined', '');
    // callback(this.RESULT_SUCCESS, Buffer.from(data, 'utf8'));
  }
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
