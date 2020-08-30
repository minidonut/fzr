import * as execa from 'execa';
import { PecoNotFoundError } from '../../error';
import { ask } from './ask';

async function command(): Promise<void> {
  try {
    // check peco exist
    // how about using 'command-exists' package?
    await execa('which', ['peco']);
  } catch {
    throw new PecoNotFoundError();
  }

  const database = await ask.database();
  const basepath = await ask.basepath();

  console.log({ database, basepath });
}

export default command;
