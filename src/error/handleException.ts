import { UnSupportedError } from './Errors';
export async function handleException(e: Error): Promise<void> {
  if (e instanceof UnSupportedError) {
    console.error(e.message);
  } else {
    // unhandled;
    throw e;
  }

  process.exit(1);
}
