import { find } from '../../utils/find';
import { getDatabase } from '../../database';
import * as chalk from 'chalk';

async function command(): Promise<void> {
  const [selected, database] = await Promise.all([find('remove'), getDatabase()]);
  const key = selected.slice(132);
  const item = await database.remove(key);
  console.log(`${chalk.redBright('remove')} record '${item.title}' 👍`);
}

export default command;
