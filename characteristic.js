var util = require('util');
var bleno = require('bleno');

function DENSeCharacteristic1() {
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
  this._updateValueCallback = null;
}

util.inherits(DENSeCharacteristic1, bleno.Characteristic);

DENSeCharacteristic1.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
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
  if (data.toString().includes('{') && data.toString().includes('header')) {
    this._tmpMessages = data;
  } else {
    this._tmpMessages += data;
  }
  console.log('storing messages:', data.toString());
  callback(this.RESULT_SUCCESS);
};

DENSeCharacteristic1.prototype.onReadRequest = function (offset, callback) {
  console.log('incoming read req');

  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
    return;
  }

  // get data, then write response
  if (!this._tmpMessages) {
    console.log('you have no messages stored');
    callback(this.RESULT_SUCCESS, Buffer.from('EOF', 'utf8'));
  } else {
    const data = this._tmpMessages.toString();
    console.log('getting messages:', data);
    data.replace('undefined', '');
    callback(this.RESULT_SUCCESS, Buffer.from(data, 'utf8'));
  }
};

// handle on subscribe
DENSeCharacteristic1.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
  console.log('on subscribe');

  this._updateValueCallback = updateValueCallback;
};

// handle on unsubscribe
DENSeCharacteristic1.prototype.onUnsubscribe = function () {
  console.log('on unsubscribe');

  this._updateValueCallback = null;
};

function DENSeCharacteristic2() {
  bleno.Characteristic.call(this, {
    uuid: '20000000-0000-0000-0000-000000000002'.replace(/\-/gi, ''),
    properties: ['read', 'write', 'notify', 'writeWithoutResponse'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'DENSe protocol',
      }),
    ],
  });
  this._tmpMessages = '';
  this._updateValueCallback = null;
}

util.inherits(DENSeCharacteristic2, bleno.Characteristic);

DENSeCharacteristic2.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
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
  if (data.toString().includes('{') && data.toString().includes('header')) {
    this._tmpMessages = data;
  } else {
    this._tmpMessages += data;
  }
  console.log('storing messages:', data.toString());
  callback(this.RESULT_SUCCESS);
};

DENSeCharacteristic2.prototype.onReadRequest = function (offset, callback) {
  console.log('incoming read req');

  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
    return;
  }

  // get data, then write response
  if (!this._tmpMessages) {
    console.log('you have no messages stored');
    callback(this.RESULT_SUCCESS, Buffer.from('EOF', 'utf8'));
  } else {
    const data = this._tmpMessages.toString();
    console.log('getting messages:', data);
    data.replace('undefined', '');
    callback(this.RESULT_SUCCESS, Buffer.from(data, 'utf8'));
  }
};

// handle on subscribe
DENSeCharacteristic2.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
  console.log('on subscribe');

  this._updateValueCallback = updateValueCallback;
};

// handle on unsubscribe
DENSeCharacteristic2.prototype.onUnsubscribe = function () {
  console.log('on unsubscribe');

  this._updateValueCallback = null;
};

function DENSeCharacteristic3() {
  bleno.Characteristic.call(this, {
    uuid: '20000000-0000-0000-0000-000000000003'.replace(/\-/gi, ''),
    properties: ['read', 'write', 'notify', 'writeWithoutResponse'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'DENSe protocol',
      }),
    ],
  });
  this._tmpMessages = '';
  this._updateValueCallback = null;
}

util.inherits(DENSeCharacteristic3, bleno.Characteristic);

DENSeCharacteristic3.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
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
  if (data.toString().includes('{') && data.toString().includes('header')) {
    this._tmpMessages = data;
  } else {
    this._tmpMessages += data;
  }
  console.log('storing messages:', data.toString());
  callback(this.RESULT_SUCCESS);
};

DENSeCharacteristic3.prototype.onReadRequest = function (offset, callback) {
  console.log('incoming read req');

  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
    return;
  }

  // get data, then write response
  if (!this._tmpMessages) {
    console.log('you have no messages stored');
    callback(this.RESULT_SUCCESS, Buffer.from('EOF', 'utf8'));
  } else {
    const data = this._tmpMessages.toString();
    console.log('getting messages:', data);
    data.replace('undefined', '');
    callback(this.RESULT_SUCCESS, Buffer.from(data, 'utf8'));
  }
};

// handle on subscribe
DENSeCharacteristic3.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
  console.log('on subscribe');

  this._updateValueCallback = updateValueCallback;
};

// handle on unsubscribe
DENSeCharacteristic3.prototype.onUnsubscribe = function () {
  console.log('on unsubscribe');

  this._updateValueCallback = null;
};

module.exports = { DENSeCharacteristic1, DENSeCharacteristic2, DENSeCharacteristic3 };
