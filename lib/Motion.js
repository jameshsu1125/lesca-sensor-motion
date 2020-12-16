"use strict";

module.exports = {
  is: true,
  each_time: 1,
  delay_callback: 1000,
  disable: true,
  isSuppord: false,
  init: function init(granted) {
    var _this = this;

    var deined = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (this.get() === 'desktop') {
      //desktop escap all
      this.error();
      return false;
    } // IOS 14+ need permission request.


    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      // ISO need SSL also.
      if (window.location.protocol.indexOf('https') < 0) {
        this.error();
        return false;
      }

      DeviceMotionEvent.requestPermission().then(function (permissionState) {
        if (permissionState === 'granted') {
          _this.isSuppord = true;
          granted();
        } else {
          _this.isSuppord = false;
          deined();
        }
      })["catch"](console.error);
    } else {
      this.isSuppord = true;
      granted();
    }
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
  sync: function sync() {
    var _this3 = this;

    if (!this.disable) return;
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
      }, this.delay_callback);
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