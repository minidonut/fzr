import { UnSupportedCommandError } from './Errors';
export async function handleException(e: Error): Promise<void> {
  if (e instanceof UnSupportedCommandError) {
    console.error(e.message);
  } else {
    // unhandled;
    throw e;
  }

  process.exit(1);
}
