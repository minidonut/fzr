import { version } from '../../../package.json';
import { box } from '../../printer/box';
import * as chalk from 'chalk';
async function command(): Promise<void> {
  const updateAvailable = false;
  if (updateAvailable) {
    // todo - version checking
  }
  console.log(box(`fzr version ${chalk.greenBright(version)}`));
}

export default command;
