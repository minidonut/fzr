import { find } from '../../utils/find';
import { getDatabase } from '../../database';
import * as chalk from 'chalk';
import { leftbox } from '../../utils/box';

async function command(): Promise<void> {
  const [selected, database] = await Promise.all([find('remove'), getDatabase()]);
  const key = selected.slice(132);
  const item = await database.remove(key);
  console.log(
    leftbox(`${chalk.redBright('remove')} 👍

(${chalk.greenBright('title')})    ${item.title}
(${chalk.greenBright('body')})     ${item.body}
(${chalk.greenBright('resource')}) ${item.resource}`)
  );
}

export default command;
