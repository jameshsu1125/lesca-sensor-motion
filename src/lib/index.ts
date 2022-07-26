import MobileDetect from 'mobile-detect';

const { navigator, location } = window;
const { userAgent } = navigator;
const { protocol } = location;

enum Permission {
  granted = 'granted',
  deined = 'deined',
}

enum STATUS {
  unset = 'unset',
  desktop = 'desktop is not support',
  ssl = 'https require',
  userDeined = 'user deined',
  deined = 'motion not support!',
}

const defaultAccelerationIncludingGravity: DeviceMotionEventAcceleration = {
  x: 0,
  y: 0,
  z: 0,
};

export default class Motion {
  public disable: boolean;
  public isSuppord: boolean;
  public delay: number;
  public each: number;
  private isQueue: boolean;
  private bindFunction: (e: DeviceMotionEvent) => void;
  private sum: DeviceMotionEventAcceleration | null;
  private sum2: DeviceMotionEventAcceleration | null;
  private callback: Function;
  private force: number;
  private queue: NodeJS.Timer;
  /**
   * new Motion(1000, 50);
   * @param {number} delay if callback called, the lisener will stop as deplay time;
   * @param {number} each time of each frame
   */
  constructor(delay = 1000, each = 50) {
    this.disable = true; // use for stop listen not distory
    this.isSuppord = false; // check devicemotion support?
    this.delay = delay; // if callback called, the lisener will stop as deplay time;
    this.each = each; // time of each frame

    this.isQueue = true; // for deplay use.
    this.bindFunction = (e: DeviceMotionEvent) => {};
    this.sum = defaultAccelerationIncludingGravity;
    this.sum2 = defaultAccelerationIncludingGravity;
    this.callback = (e: number) => {
      console.log(e);
    };
    this.force = 20;
    this.queue = setInterval(() => {});
  }

  /**
   * initial on click event
   * @returns
   */
  permission() {
    return new Promise((res, rej) => {
      //desktop escap all
      if (this.get() === 'desktop') {
        rej(STATUS.desktop);
      }

      // IOS 14+ need permission request.
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        // ISO need SSL also.
        if (protocol.indexOf('https') < 0) {
          rej(STATUS.ssl);
        }

        (DeviceMotionEvent as any)
          .requestPermission()
          .then((permissionState: string) => {
            if (permissionState === Permission.granted) {
              this.isSuppord = true;
              res(permissionState);
            } else {
              this.isSuppord = false;
              rej(STATUS.userDeined);
            }
          })
          .catch(console.error);
      } else {
        this.isSuppord = true;
        res(Permission.deined);
      }
    });
  }

  /**
   * add listener
   * @param {number} force a value for shake force
   * @param {function} callback
   */
  addEventListener(force = 20, callback: Function) {
    this.isQueue = true;

    this.bindFunction = this.call.bind(this);

    if (callback) this.callback = callback;
    this.force = force;
    this.sum = this.sum2 = { x: 0, y: 0, z: 0 };

    window.addEventListener('devicemotion', this.bindFunction);
    this.queue = setInterval(() => {
      this.sync();
    }, this.each);
  }

  sync() {
    if (!this.disable) return;

    if (this.sum !== null && this.sum2 !== null) {
      if (this.sum.x && this.sum.y && this.sum.z && this.sum2.x && this.sum2.y && this.sum2.z) {
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
    }
  }

  call(e: DeviceMotionEvent) {
    this.sum = e.accelerationIncludingGravity;
  }

  /**
   * remove Events
   */
  destory() {
    window.removeEventListener('devicemotion', this.bindFunction);
  }

  error() {
    console.log(STATUS.deined);
  }

  get() {
    const m = new MobileDetect(userAgent);
    if (m.tablet() || m.mobile()) return 'mobile';
    return 'desktop';
  }
}
