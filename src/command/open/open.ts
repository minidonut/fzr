import * as open from 'open';
import { getDatabase } from '../../database';
import * as chalk from 'chalk';
import * as clipboardy from 'clipboardy';

async function command(key: string): Promise<void> {
  const database = await getDatabase();
  const item = await database.get(key);

  if (item.resource.startsWith('http')) {
    // resource is url
    const urls = item.resource.split('\n');
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
  process.exit(0);
}

export default command;
