"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _mobileDetect = _interopRequireDefault(require("mobile-detect"));
var _window = window,
  navigator = _window.navigator,
  location = _window.location;
var userAgent = navigator.userAgent;
var protocol = location.protocol;
var Permission = /*#__PURE__*/function (Permission) {
  Permission["granted"] = "granted";
  Permission["denied"] = "denied";
  return Permission;
}(Permission || {});
var STATUS = /*#__PURE__*/function (STATUS) {
  STATUS["unset"] = "unset";
  STATUS["desktop"] = "desktop is not support";
  STATUS["ssl"] = "https require";
  STATUS["userDenied"] = "user denied";
  STATUS["denied"] = "motion not support!";
  return STATUS;
}(STATUS || {});
var defaultAccelerationIncludingGravity = {
  x: 0,
  y: 0,
  z: 0
};
var Motion = exports["default"] = /*#__PURE__*/function () {
  /**
   * new Motion(1000, 50);
   * @param {number} delay if callback called, the listener will stop as delay time;
   * @param {number} each time of each frame
   */
  function Motion() {
    var _this = this;
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    var each = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    (0, _classCallCheck2["default"])(this, Motion);
    (0, _defineProperty2["default"])(this, "disable", void 0);
    (0, _defineProperty2["default"])(this, "isSupported", void 0);
    (0, _defineProperty2["default"])(this, "delay", void 0);
    (0, _defineProperty2["default"])(this, "each", void 0);
    (0, _defineProperty2["default"])(this, "isQueue", void 0);
    (0, _defineProperty2["default"])(this, "force", void 0);
    (0, _defineProperty2["default"])(this, "sum", void 0);
    (0, _defineProperty2["default"])(this, "sum2", void 0);
    (0, _defineProperty2["default"])(this, "bindFunction", void 0);
    (0, _defineProperty2["default"])(this, "callback", void 0);
    (0, _defineProperty2["default"])(this, "call", void 0);
    (0, _defineProperty2["default"])(this, "error", void 0);
    (0, _defineProperty2["default"])(this, "sync", void 0);
    (0, _defineProperty2["default"])(this, "get", void 0);
    (0, _defineProperty2["default"])(this, "queue", void 0);
    this.disable = true; // use for stop listen not destroy
    this.isSupported = false; // check devicemotion support?
    this.delay = delay; // if callback called, the listener will stop as delay time;
    this.each = each; // time of each frame

    this.isQueue = true; // for delay use.
    this.sum = defaultAccelerationIncludingGravity;
    this.sum2 = defaultAccelerationIncludingGravity;
    this.force = 20;
    this.queue = null;
    this.bindFunction = function (e) {};
    this.callback = function (e) {
      return console.log(e);
    };
    this.call = function (e) {
      _this.sum = e.accelerationIncludingGravity;
    };
    this.error = function () {
      return console.log(STATUS.denied);
    };
    this.sync = function () {
      if (!_this.disable) return;
      if (_this.sum !== null && _this.sum2 !== null) {
        if (typeof _this.sum.x === 'number' && typeof _this.sum.y === 'number' && typeof _this.sum.z === 'number' && typeof _this.sum2.x === 'number' && typeof _this.sum2.y === 'number' && typeof _this.sum2.z === 'number') {
          var x = Math.abs(_this.sum.x - _this.sum2.x);
          var y = Math.abs(_this.sum.y - _this.sum2.y);
          var z = Math.abs(_this.sum.z - _this.sum2.z);
          var c = Math.abs(x + y + z);
          if (c > _this.force) {
            if (!_this.isQueue) return;
            _this.isQueue = false;
            _this.callback(c);
            _this.sum2 = _this.sum = {
              x: 0,
              y: 0,
              z: 0
            };
            setTimeout(function () {
              return _this.isQueue = true;
            }, _this.delay);
          }
          _this.sum2 = _this.sum;
        }
      }
    };
    this.get = function () {
      var m = new _mobileDetect["default"](userAgent);
      if (m.tablet() || m.mobile()) return 'mobile';
      return 'desktop';
    };
  }

  /**
   * initial on click event
   * @returns
   */
  (0, _createClass2["default"])(Motion, [{
    key: "permission",
    value: function permission() {
      var _this2 = this;
      return new Promise(function (res, rej) {
        //desktop escape all
        if (_this2.get() === 'desktop') {
          rej(STATUS.desktop);
        }

        // IOS 14+ need permission request.
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
          // ISO need SSL also.
          if (protocol.indexOf('https') < 0) rej(STATUS.ssl);
          DeviceMotionEvent.requestPermission().then(function (permissionState) {
            if (permissionState === Permission.granted) {
              _this2.isSupported = true;
              res(permissionState);
            } else {
              _this2.isSupported = false;
              rej(STATUS.userDenied);
            }
          })["catch"](_this2.error);
        } else {
          _this2.isSupported = true;
          res(Permission.denied);
        }
      });
    }

    /**
     * add listener
     * @param {number} force a value for shake force
     * @param {function} callback
     */
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      var _this3 = this;
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      this.force = force;
      this.isQueue = true;
      this.bindFunction = this.call.bind(this);
      if (callback) this.callback = callback;
      this.sum = this.sum2 = {
        x: 0,
        y: 0,
        z: 0
      };
      window.addEventListener('devicemotion', this.bindFunction);
      this.queue = setInterval(function () {
        return _this3.sync();
      }, this.each);
    }

    /**
     * remove Events
     */
  }, {
    key: "destroy",
    value: function destroy() {
      window.removeEventListener('devicemotion', this.bindFunction);
      if (this.queue) clearInterval(this.queue);
    }
  }]);
  return Motion;
}();