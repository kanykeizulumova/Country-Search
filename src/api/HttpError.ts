export class HttpError extends Error {
  public status: number;

  constructor(status: number, message?: string) {
    super(message ?? `Server error: status ${status}`);
    this.status = status;
    this.name = 'HttpError';

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
