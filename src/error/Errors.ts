export class UnSupportedError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = this.constructor.name;
  }
}
