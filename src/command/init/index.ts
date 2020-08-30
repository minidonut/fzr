import * as execa from 'execa';
import { PecoNotFoundError } from '../../error';
import { ask } from './ask';
import { setup } from './setup';
import { context } from '../../context';

async function command(): Promise<void> {
  try {
    // check peco exist
    // how about using 'command-exists' package?
    await execa('which', ['peco']);
  } catch {
    throw new PecoNotFoundError();
  }

  const database = await ask.database();
  context.basepath = await ask.basepath();

  await setup({
    database,
  });
}

export default command;
