import { UnSupportedCommandError, NotImplementedCommandError } from './Errors';
export async function handleException(e: Error): Promise<void> {
  if (e instanceof UnSupportedCommandError || e instanceof NotImplementedCommandError) {
    console.error(e.message);
  } else {
    // unhandled;
    throw e;
  }

  process.exit(1);
}
