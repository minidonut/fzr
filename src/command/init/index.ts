import * as execa from 'execa';
import { PecoNotFoundError } from '../../error';
import { ask } from './ask';
import { setup } from './setup';
import { env } from '../../context/env';

async function command(): Promise<void> {
  try {
    // check peco exist
    // how about using 'command-exists' package?
    await execa('which', ['peco']);
  } catch {
    throw new PecoNotFoundError();
  }

  const database = await ask.database();
  env.basePath = await ask.basepath();
  env.profile = await ask.profile();

  console.log(env);
  await setup({
    database,
  });

  console.log('done 😎');
}

export default command;
