var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "mobile-detect"], function (require, exports, mobile_detect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    mobile_detect_1 = __importDefault(mobile_detect_1);
    var navigator = window.navigator, location = window.location;
    var userAgent = navigator.userAgent;
    var protocol = location.protocol;
    var Permission;
    (function (Permission) {
        Permission["granted"] = "granted";
        Permission["deined"] = "deined";
    })(Permission || (Permission = {}));
    var STATUS;
    (function (STATUS) {
        STATUS["unset"] = "unset";
        STATUS["desktop"] = "desktop is not support";
        STATUS["ssl"] = "https require";
        STATUS["userDeined"] = "user deined";
        STATUS["deined"] = "motion not support!";
    })(STATUS || (STATUS = {}));
    var defaultAccelerationIncludingGravity = {
        x: 0,
        y: 0,
        z: 0,
    };
    var Motion = /** @class */ (function () {
        /**
         * new Motion(1000, 50);
         * @param {number} delay if callback called, the lisener will stop as deplay time;
         * @param {number} each time of each frame
         */
        function Motion(delay, each) {
            if (delay === void 0) { delay = 1000; }
            if (each === void 0) { each = 50; }
            var _this = this;
            this.disable = true; // use for stop listen not distory
            this.isSuppord = false; // check devicemotion support?
            this.delay = delay; // if callback called, the lisener will stop as deplay time;
            this.each = each; // time of each frame
            this.isQueue = true; // for deplay use.
            this.sum = defaultAccelerationIncludingGravity;
            this.sum2 = defaultAccelerationIncludingGravity;
            this.force = 20;
            this.queue = null;
            this.bindFunction = function (e) { };
            this.callback = function (e) { return console.log(e); };
            this.call = function (e) {
                _this.sum = e.accelerationIncludingGravity;
            };
            this.error = function () { return console.log(STATUS.deined); };
            this.sync = function () {
                if (!_this.disable)
                    return;
                if (_this.sum !== null && _this.sum2 !== null) {
                    if (typeof _this.sum.x === 'number' &&
                        typeof _this.sum.y === 'number' &&
                        typeof _this.sum.z === 'number' &&
                        typeof _this.sum2.x === 'number' &&
                        typeof _this.sum2.y === 'number' &&
                        typeof _this.sum2.z === 'number') {
                        var x = Math.abs(_this.sum.x - _this.sum2.x);
                        var y = Math.abs(_this.sum.y - _this.sum2.y);
                        var z = Math.abs(_this.sum.z - _this.sum2.z);
                        var c = Math.abs(x + y + z);
                        if (c > _this.force) {
                            if (!_this.isQueue)
                                return;
                            _this.isQueue = false;
                            _this.callback(c);
                            _this.sum2 = _this.sum = { x: 0, y: 0, z: 0 };
                            setTimeout(function () { return (_this.isQueue = true); }, _this.delay);
                        }
                        _this.sum2 = _this.sum;
                    }
                }
            };
            this.get = function () {
                var m = new mobile_detect_1.default(userAgent);
                if (m.tablet() || m.mobile())
                    return 'mobile';
                return 'desktop';
            };
        }
        /**
         * initial on click event
         * @returns
         */
        Motion.prototype.permission = function () {
            var _this = this;
            return new Promise(function (res, rej) {
                //desktop escap all
                if (_this.get() === 'desktop') {
                    rej(STATUS.desktop);
                }
                // IOS 14+ need permission request.
                if (typeof DeviceMotionEvent.requestPermission === 'function') {
                    // ISO need SSL also.
                    if (protocol.indexOf('https') < 0)
                        rej(STATUS.ssl);
                    DeviceMotionEvent
                        .requestPermission()
                        .then(function (permissionState) {
                        if (permissionState === Permission.granted) {
                            _this.isSuppord = true;
                            res(permissionState);
                        }
                        else {
                            _this.isSuppord = false;
                            rej(STATUS.userDeined);
                        }
                    })
                        .catch(_this.error);
                }
                else {
                    _this.isSuppord = true;
                    res(Permission.deined);
                }
            });
        };
        /**
         * add listener
         * @param {number} force a value for shake force
         * @param {function} callback
         */
        Motion.prototype.addEventListener = function (force, callback) {
            var _this = this;
            if (force === void 0) { force = 20; }
            this.force = force;
            this.isQueue = true;
            this.bindFunction = this.call.bind(this);
            if (callback)
                this.callback = callback;
            this.sum = this.sum2 = { x: 0, y: 0, z: 0 };
            window.addEventListener('devicemotion', this.bindFunction);
            this.queue = setInterval(function () { return _this.sync(); }, this.each);
        };
        /**
         * remove Events
         */
        Motion.prototype.destory = function () {
            window.removeEventListener('devicemotion', this.bindFunction);
            if (this.queue)
                clearInterval(this.queue);
        };
        return Motion;
    }());
    exports.default = Motion;
});
