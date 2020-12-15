"use strict";

module.exports = {
  is: true,
  each_time: 1,
  delayCallback: 1000,
  ds: true,
  init: function init(ready) {
    var _this = this;

    if (this.get() === 'desktop') {
      //desktop escap all
      this.error();
      return false;
    }

    this.ready = ready;

    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      // IOS 14+
      if (window.location.protocol.indexOf('https') < 0) {
        // SSL require
        this.error();
        return false;
      }

      DeviceMotionEvent.requestPermission().then(function (permissionState) {
        if (permissionState === 'granted') _this.ready();else alert('permission denied!');
      })["catch"](console.error);
    } else this.ready();
  },
  addEvent: function addEvent() {
    var _this2 = this;

    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
    var callback = arguments.length > 1 ? arguments[1] : undefined;
    this.f = this.call.bind(this);
    this.cb = callback || this.on;
    this.g = v;
    this.d = this.d2 = {
      x: 0,
      y: 0,
      z: 0
    };
    this.is = true;
    window.addEventListener('devicemotion', this.f);
    this.i = setInterval(function () {
      _this2.sync();
    }, this.each_time);
  },
  call: function call(e) {
    this.d = e.accelerationIncludingGravity;
  },
  disable: function disable(v) {
    this.ds = v;
  },
  sync: function sync() {
    var _this3 = this;

    if (!this.ds) return;
    var x = Math.abs(this.d.x - this.d2.x),
        y = Math.abs(this.d.y - this.d2.y),
        z = Math.abs(this.d.z - this.d2.z),
        c = Math.abs(x + y + z);

    if (c > this.g) {
      if (!this.is) return;
      this.is = false;
      this.cb(c);
      this.d2 = this.d = {
        x: 0,
        y: 0,
        z: 0
      };
      setTimeout(function () {
        _this3.is = true;
      }, this.delayCallback);
    }

    this.d2 = this.d;
  },
  on: function on(e) {
    console.log(e);
  },
  destory: function destory() {
    this.d = this.d2 = {
      x: 0,
      y: 0,
      z: 0
    };
    this.is = false;
    window.removeEventListener('devicemotion', this.f);
    clearInterval(this.i);
  },
  error: function error(e) {
    console.log('motion not support!');
  },
  get: function get() {
    var MobileDetect = require('mobile-detect'),
        m = new MobileDetect(window.navigator.userAgent);

    if (m.tablet()) return 'mobile';else if (m.mobile()) return 'mobile';else return 'desktop';
  }
};