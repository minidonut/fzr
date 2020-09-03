import { find } from '../../utils/find';
import { getDatabase } from '../../database';
import * as open from 'open';
import * as chalk from 'chalk';
import * as clipboardy from 'clipboardy';

async function command(): Promise<void> {
  const [selected, database] = await Promise.all([find('open'), getDatabase()]);
  const key = selected.slice(132);
  const item = await database.get(key);

  if (item.resource.startsWith('http')) {
    // resource is url
    const urls = item.resource.split(',');
    for (const url of urls) {
      await open(url.trim());
      console.log(`open ${chalk.blueBright(url.trim())}`);
    }
  } else {
    // resource is snippet
    console.log(item.resource);
    await clipboardy.write(item.resource);
    console.log(chalk.greenBright('copied'), '👍');
  }
}

export default command;
