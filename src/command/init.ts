import * as execa from 'execa';
import * as path from 'path';
import * as os from 'os';
import * as chalk from 'chalk';
import { PecoNotFoundError } from '../error';
import { onCancel } from '../utils/prompt';
import * as prompts from 'prompts';

async function command(): Promise<void> {
  try {
    // check peco exist
    // how about using 'command-exists' package?
    await execa('which', ['peco']);
  } catch {
    throw new PecoNotFoundError();
  }

  // prettier-ignore
  const { database } = await prompts({
    name: 'database',
    type: 'select',
    message: '(1/5) Choose database type',
    choices: [
      { title: 'json', description: 'lowest performace, zero dependency', value: 'json' },
      { title: 'sqlite', description: 'sqlite required', value: 'sqlite' },
      { title: 'mysql', description: 'MySQL required (not supported yet)', value: 'mysql', disabled: true },
      {
        title: 'dynamodb',
        description: 'aws credential required (not supported yet)',
        value: 'dynamodb',
        disabled: true,
      },
    ],
    initial: 1,
  }, { onCancel: onCancel('init') });

  const { basepath } = await prompts(
    {
      name: 'basepath',
      type: 'text',
      message: `(2/5) Where to save data (start with ${chalk.greenBright(os.homedir)})`,
      initial: path.join('.fzr'),
    },
    { onCancel: onCancel('init') }
  );

  console.log({ database, basepath });
}

export default command;
