import MobileDetect from 'mobile-detect';

const { navigator, location } = window;
const { userAgent } = navigator;
const { protocol } = location;

export default class Motion {
	/**
	 * new Motion(1000, 50);
	 * @param {number} delay if callback called, the lisener will stop as deplay time;
	 * @param {number} each time of each frame
	 */
	constructor(delay = 1000, each = 50) {
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
	init(granted, deined = void 0) {
		//desktop escap all
		if (this.get() === 'desktop') {
			this.error();
			return false;
		}

		// IOS 14+ need permission request.
		if (typeof DeviceMotionEvent.requestPermission === 'function') {
			// ISO need SSL also.
			if (protocol.indexOf('https') < 0) {
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
	}

	/**
	 * add listener
	 * @param {number} force a value for shake force
	 * @param {function} callback
	 */
	addlistener(force = 20, callback) {
		const logOut = (e) => {
			console.log(e);
		};

		this.isQueue = true;

		this.f = this.call.bind(this);

		this.callback = callback || logOut;
		this.force = force;
		this.sum = this.sum2 = { x: 0, y: 0, z: 0 };

		window.addEventListener('devicemotion', this.f);
		this.queue = setInterval(() => {
			this.sync();
		}, this.each);
	}

	sync() {
		if (!this.disable) return;

		const x = Math.abs(this.sum.x - this.sum2.x);
		const y = Math.abs(this.sum.y - this.sum2.y);
		const z = Math.abs(this.sum.z - this.sum2.z);
		const c = Math.abs(x + y + z);

		if (c > this.force) {
			if (!this.isQueue) return;
			this.isQueue = false;
			this.callback(c);
			this.sum2 = this.sum = { x: 0, y: 0, z: 0 };
			setTimeout(() => {
				this.isQueue = true;
			}, this.delay);
		}

		this.sum2 = this.sum;
	}

	call(e) {
		this.sum = e.accelerationIncludingGravity;
	}

	destory() {
		window.removeEventListener('devicemotion', this.f);
	}

	error(e) {
		console.log('motion not support!');
	}

	get() {
		const m = new MobileDetect(userAgent);
		if (m.tablet() || m.mobile()) return 'mobile';
		return 'desktop';
	}
}
