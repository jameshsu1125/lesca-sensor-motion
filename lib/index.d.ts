export default class Motion {
    disable: boolean;
    isSuppord: boolean;
    delay: number;
    each: number;
    private isQueue;
    private force;
    private sum;
    private sum2;
    private bindFunction;
    private callback;
    private call;
    private error;
    private sync;
    private get;
    private queue;
    /**
     * new Motion(1000, 50);
     * @param {number} delay if callback called, the lisener will stop as deplay time;
     * @param {number} each time of each frame
     */
    constructor(delay?: number, each?: number);
    /**
     * initial on click event
     * @returns
     */
    permission(): Promise<unknown>;
    /**
     * add listener
     * @param {number} force a value for shake force
     * @param {function} callback
     */
    addEventListener(force: number | undefined, callback: Function): void;
    /**
     * remove Events
     */
    destory(): void;
}
