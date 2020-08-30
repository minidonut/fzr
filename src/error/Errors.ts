import * as chalk from 'chalk';
import { box } from '../printer/box';

export class UnSupportedCommandError extends Error {
  command: string;

  constructor(command: string) {
    super();
    this.command = command;
    this.name = this.constructor.name;
  }

  get message(): string {
    return box(`Command '${chalk.greenBright(this.command)}' is not supported 😔

try 'fzr help'

for more information, see
${chalk.blueBright('https://github.com/minidonut/fzr/issues')}`);
  }
}

export class NotImplementedCommandError extends Error {
  command: string;

  constructor(command: string) {
    super();
    this.command = command;
    this.name = this.constructor.name;
  }

  get message(): string {
    return box(`Command '${chalk.greenBright(this.command)}' is on development 🔥

for more information, see

${chalk.blueBright('https://github.com/minidonut/fzr/issues')}`);
  }
}
