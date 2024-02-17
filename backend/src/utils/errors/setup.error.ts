export abstract class SetupError extends Error {
    msg: string
    constructor({msg}:{msg: string}){
        super(msg);
        this.msg = msg;
    }
    toString() {
        return `[${this.name}]: msg: ${this.msg}, stack: ${this.stack}`;
      }
}