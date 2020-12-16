module.exports = {
	is: true,
	each_time: 1,
	delay_callback: 1000,
	disable: true,
	isSuppord: false,
	init(granted, deined = () => {}) {
		if (this.get() === 'desktop') {
			//desktop escap all
			this.error();
			return false;
		}

		// IOS 14+ need permission request.
		if (typeof DeviceMotionEvent.requestPermission === 'function') {
			// ISO need SSL also.
			if (window.location.protocol.indexOf('https') < 0) {
				this.error();
				return false;
			}

			DeviceMotionEvent.requestPermission()
				.then((permissionState) => {
					if (permissionState === 'granted') {
						this.isSuppord = true;
						granted();
					} else {
						this.isSuppord = false;
						deined();
					}
				})
				.catch(console.error);
		} else {
			this.isSuppord = true;
			granted();
		}
	},
	addEvent(v = 20, callback) {
		this.f = this.call.bind(this);
		this.cb = callback || this.on;
		this.g = v;
		this.d = this.d2 = { x: 0, y: 0, z: 0 };
		this.is = true;
		window.addEventListener('devicemotion', this.f);
		this.i = setInterval(() => {
			this.sync();
		}, this.each_time);
	},
	call(e) {
		this.d = e.accelerationIncludingGravity;
	},
	sync() {
		if (!this.disable) return;

		let x = Math.abs(this.d.x - this.d2.x),
			y = Math.abs(this.d.y - this.d2.y),
			z = Math.abs(this.d.z - this.d2.z),
			c = Math.abs(x + y + z);

		if (c > this.g) {
			if (!this.is) return;
			this.is = false;
			this.cb(c);
			this.d2 = this.d = { x: 0, y: 0, z: 0 };
			setTimeout(() => {
				this.is = true;
			}, this.delay_callback);
		}

		this.d2 = this.d;
	},
	on(e) {
		console.log(e);
	},
	destory() {
		this.d = this.d2 = {
			x: 0,
			y: 0,
			z: 0,
		};
		this.is = false;
		window.removeEventListener('devicemotion', this.f);
		clearInterval(this.i);
	},
	error(e) {
		console.log('motion not support!');
	},
	get() {
		let MobileDetect = require('mobile-detect'),
			m = new MobileDetect(window.navigator.userAgent);
		if (m.tablet()) return 'mobile';
		else if (m.mobile()) return 'mobile';
		else return 'desktop';
	},
};
