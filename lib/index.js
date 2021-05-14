"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mobileDetect = _interopRequireDefault(require("mobile-detect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _window = window,
    navigator = _window.navigator,
    location = _window.location;
var userAgent = navigator.userAgent;
var protocol = location.protocol;

var Motion = /*#__PURE__*/function () {
  /**
   * new Motion(1000, 50);
   * @param {number} delay if callback called, the lisener will stop as deplay time;
   * @param {number} each time of each frame
   */
  function Motion() {
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    var each = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

    _classCallCheck(this, Motion);

    this.disable = true; // use for stop listen not distory

    this.isSuppord = false; // check devicemotion support?

    this.isQueue = true; // for deplay use.

    this.delay = delay; // if callback called, the lisener will stop as deplay time;

    this.each = each; // time of each frame
  }
  /**
   * initial on click event
   * @param {function} granted permission granted function
   * @param {function} deined permission deined function
   * @returns
   */


  _createClass(Motion, [{
    key: "init",
    value: function init(granted) {
      var _this = this;

      var deined = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;

      //desktop escap all
      if (this.get() === 'desktop') {
        this.error();
        return false;
      } // IOS 14+ need permission request.


      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // ISO need SSL also.
        if (protocol.indexOf('https') < 0) {
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
    }
    /**
     * add listener
     * @param {number} force a value for shake force
     * @param {function} callback
     */

  }, {
    key: "addlistener",
    value: function addlistener() {
      var _this2 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
      var callback = arguments.length > 1 ? arguments[1] : undefined;

      var logOut = function logOut(e) {
        console.log(e);
      };

      this.isQueue = true;
      this.f = this.call.bind(this);
      this.callback = callback || logOut;
      this.force = force;
      this.sum = this.sum2 = {
        x: 0,
        y: 0,
        z: 0
      };
      window.addEventListener('devicemotion', this.f);
      this.queue = setInterval(function () {
        _this2.sync();
      }, this.each);
    }
  }, {
    key: "sync",
    value: function sync() {
      var _this3 = this;

      if (!this.disable) return;
      var x = Math.abs(this.sum.x - this.sum2.x);
      var y = Math.abs(this.sum.y - this.sum2.y);
      var z = Math.abs(this.sum.z - this.sum2.z);
      var c = Math.abs(x + y + z);

      if (c > this.force) {
        if (!this.isQueue) return;
        this.isQueue = false;
        this.callback(c);
        this.sum2 = this.sum = {
          x: 0,
          y: 0,
          z: 0
        };
        setTimeout(function () {
          _this3.isQueue = true;
        }, this.delay);
      }

      this.sum2 = this.sum;
    }
  }, {
    key: "call",
    value: function call(e) {
      this.sum = e.accelerationIncludingGravity;
    }
  }, {
    key: "destory",
    value: function destory() {
      window.removeEventListener('devicemotion', this.f);
    }
  }, {
    key: "error",
    value: function error(e) {
      console.log('motion not support!');
    }
  }, {
    key: "get",
    value: function get() {
      var m = new _mobileDetect["default"](userAgent);
      if (m.tablet() || m.mobile()) return 'mobile';
      return 'desktop';
    }
  }]);

  return Motion;
}();

exports["default"] = Motion;