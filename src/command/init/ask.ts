import * as path from 'path';
import * as os from 'os';
import * as chalk from 'chalk';
import { onCancel } from '../../utils/prompt';
import * as prompts from 'prompts';

const database = async (): Promise<string> => {
  // prettier-ignore
  const { database } = await prompts({
    name: 'database',
    type: 'select',
    message: '(1/2) Choose database type',
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

  return database;
};

const basepath = async (): Promise<string> => {
  const { basepath } = await prompts(
    {
      name: 'basepath',
      type: 'text',
      message: `(2/2) Where to save data (start with ${chalk.greenBright(os.homedir)})`,
      initial: path.join('.fzr'),
    },
    { onCancel: onCancel('init') }
  );
  return basepath;
};

export const ask = {
  database,
  basepath,
};
