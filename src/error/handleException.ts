import { BaseError } from './Errors';
export function handleException(e: Error): void {
  if (e instanceof BaseError) {
    console.error(e.message);
    process.exit(1);
  } else {
    // unhandled;
    throw e;
  }
}
