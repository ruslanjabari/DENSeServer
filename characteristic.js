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
  this._tmpMessages1 = '';
  this._updateValueCallback1 = null;
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
  if (this._updateValueCallback1) {
    this._updateValueCallback1(data);
  }

  // store data, then write response
  if (data.toString().includes('{') && data.toString().includes('header')) {
    this._tmpMessages1 = data;
  } else {
    this._tmpMessages1 += data;
  }
  console.log('storing messages (CHAR 1):', data.toString());
  callback(this.RESULT_SUCCESS);
};

DENSeCharacteristic1.prototype.onReadRequest = function (offset, callback) {
  console.log('incoming read req');

  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
    return;
  }

  // get data, then write response
  if (!this._tmpMessages1) {
    console.log('you have no messages stored');
    callback(this.RESULT_SUCCESS, Buffer.from('EOF', 'utf8'));
  } else {
    const data = this._tmpMessages1.toString();
    console.log('getting messages: (CHAR 1)', data);
    data.replace('undefined', '');
    callback(this.RESULT_SUCCESS, Buffer.from(data, 'utf8'));
  }
};

// handle on subscribe
DENSeCharacteristic1.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
  console.log('on subscribe');

  this._updateValueCallback1 = updateValueCallback;
};

// handle on unsubscribe
DENSeCharacteristic1.prototype.onUnsubscribe = function () {
  console.log('on unsubscribe');

  this._updateValueCallback1 = null;
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
  this._tmpMessages2 = '';
  this._updateValueCallback2 = null;
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
  if (this._updateValueCallback2) {
    this._updateValueCallback2(data);
  }

  // store data, then write response
  if (data.toString().includes('{') && data.toString().includes('header')) {
    this._tmpMessages2 = data;
  } else {
    this._tmpMessages2 += data;
  }
  console.log('storing messages: (CHAR 2)', data.toString());
  callback(this.RESULT_SUCCESS);
};

DENSeCharacteristic2.prototype.onReadRequest = function (offset, callback) {
  console.log('incoming read req');

  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
    return;
  }

  // get data, then write response
  if (!this._tmpMessages2) {
    console.log('you have no messages stored');
    callback(this.RESULT_SUCCESS, Buffer.from('EOF', 'utf8'));
  } else {
    const data = this._tmpMessages2.toString();
    console.log('getting messages: (CHAR 2)', data);
    data.replace('undefined', '');
    callback(this.RESULT_SUCCESS, Buffer.from(data, 'utf8'));
  }
};

// handle on subscribe
DENSeCharacteristic2.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
  console.log('on subscribe');

  this._updateValueCallback2 = updateValueCallback;
};

// handle on unsubscribe
DENSeCharacteristic2.prototype.onUnsubscribe = function () {
  console.log('on unsubscribe');

  this._updateValueCallback2 = null;
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
  this._tmpMessages3 = '';
  this._updateValueCallback3 = null;
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
  if (this._updateValueCallback3) {
    this._updateValueCallback3(data);
  }

  // store data, then write response
  if (data.toString().includes('{') && data.toString().includes('header')) {
    this._tmpMessages3 = data;
  } else {
    this._tmpMessages3 += data;
  }
  console.log('storing messages: (CHAR 3)', data.toString());
  callback(this.RESULT_SUCCESS);
};

DENSeCharacteristic3.prototype.onReadRequest = function (offset, callback) {
  console.log('incoming read req');

  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
    return;
  }

  // get data, then write response
  if (!this._tmpMessages3) {
    console.log('you have no messages stored');
    callback(this.RESULT_SUCCESS, Buffer.from('EOF', 'utf8'));
  } else {
    const data = this._tmpMessages3.toString();
    console.log('getting messages: (CHAR 3)', data);
    data.replace('undefined', '');
    callback(this.RESULT_SUCCESS, Buffer.from(data, 'utf8'));
  }
};

// handle on subscribe
DENSeCharacteristic3.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
  console.log('on subscribe');

  this._updateValueCallback3 = updateValueCallback;
};

// handle on unsubscribe
DENSeCharacteristic3.prototype.onUnsubscribe = function () {
  console.log('on unsubscribe');

  this._updateValueCallback3 = null;
};

function DENSeCharacteristic4() {
  bleno.Characteristic.call(this, {
    uuid: '20000000-0000-0000-0000-000000000004'.replace(/\-/gi, ''),
    properties: ['read', 'write', 'notify', 'writeWithoutResponse'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'DENSe protocol',
      }),
    ],
  });
  this._tmpMessages4 = '';
  this._updateValueCallback4 = null;
}

util.inherits(DENSeCharacteristic4, bleno.Characteristic);

DENSeCharacteristic4.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
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
  if (this._updateValueCallback4) {
    this._updateValueCallback4(data);
  }

  // store data, then write response
  if (data.toString().includes('{') && data.toString().includes('header')) {
    this._tmpMessages4 = data;
  } else {
    this._tmpMessages4 += data;
  }
  console.log('storing messages: (CHAR 4)', data.toString());
  callback(this.RESULT_SUCCESS);
};

DENSeCharacteristic4.prototype.onReadRequest = function (offset, callback) {
  console.log('incoming read req');

  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
    return;
  }

  // get data, then write response
  if (!this._tmpMessages4) {
    console.log('you have no messages stored');
    callback(this.RESULT_SUCCESS, Buffer.from('EOF', 'utf8'));
  } else {
    const data = this._tmpMessages4.toString();
    console.log('getting messages: (CHAR 4)', data);
    data.replace('undefined', '');
    callback(this.RESULT_SUCCESS, Buffer.from(data, 'utf8'));
  }
};

// handle on subscribe
DENSeCharacteristic4.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
  console.log('on subscribe');

  this._updateValueCallback4 = updateValueCallback;
};

// handle on unsubscribe
DENSeCharacteristic4.prototype.onUnsubscribe = function () {
  console.log('on unsubscribe');

  this._updateValueCallback4 = null;
};

module.exports = {
  DENSeCharacteristic1,
  DENSeCharacteristic2,
  DENSeCharacteristic3,
  DENSeCharacteristic4,
};
