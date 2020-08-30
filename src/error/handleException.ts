import { BaseError } from './Errors';
export async function handleException(e: Error): Promise<void> {
  if (e instanceof BaseError) {
    console.error(e.message);
    process.exit(1);
  } else {
    // unhandled;
    throw e;
  }
}
