import * as path from 'path';
import * as os from 'os';
import * as chalk from 'chalk';
import { onCancel } from '../../utils/prompt';
import * as prompts from 'prompts';
import { DatabaseType } from '../../model';

const database = async (): Promise<DatabaseType> => {
  // prettier-ignore
  const { database } = await prompts({
    name: 'database',
    type: 'select',
    message: '(1/3) Choose database type',
    choices: [
      { title: 'json', description: 'lowest performace, zero dependency', value: 'json' },
      { title: 'sqlite', description: 'sqlite required', value: 'sqlite', disabled: true },
      { title: 'mysql', description: 'MySQL required (not supported yet)', value: 'mysql', disabled: true },
      {
        title: 'dynamodb',
        description: 'aws credential required (not supported yet)',
        value: 'dynamodb',
        disabled: true,
      },
    ],
    initial: 0,
  }, { onCancel: onCancel('init') });

  return database as DatabaseType;
};

const basepath = async (): Promise<string> => {
  const { basepath } = await prompts(
    {
      name: 'basepath',
      type: 'text',
      message: `(2/3) Where to save data (start with ${chalk.greenBright(os.homedir)})`,
      initial: path.join('.fzr'),
    },
    { onCancel: onCancel('init') }
  );
  return path.join(os.homedir(), basepath);
};

const profile = async (): Promise<string> => {
  const { profile } = await prompts(
    {
      name: 'profile',
      type: 'text',
      message: `(3/3) Profile name (${chalk.greenBright('FZR_PROFILE')} environment variable)
        if not specified, fallback to 'default'`,
      initial: 'default',
    },
    { onCancel: onCancel('init') }
  );
  return profile;
};

export const ask = {
  database,
  basepath,
  profile,
};
