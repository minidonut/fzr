import * as chalk from 'chalk';
import { box } from '../printer/box';

export class BaseError extends Error {}

export class UnSupportedCommandError extends BaseError {
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

export class NotImplementedCommandError extends BaseError {
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

export class PecoNotFoundError extends BaseError {
  command: string;

  constructor() {
    super();
    this.name = this.constructor.name;
  }

  get message(): string {
    return box(`Runtime dependency '${chalk.yellowBright('peco')}' is not found

${chalk.blueBright('https://github.com/peco/peco#installation')}`);
  }
}

export class FileAlreadyExistError extends BaseError {
  filepath: string;
  filename: string;
  constructor(filepath: string, filename: string) {
    super();
    this.filepath = filepath;
    this.filename = filename;
  }

  get message(): string {
    return box(`⚠ failed to create ${this.filename}

'${chalk.blueBright(this.filepath)}' alreay exist`);
  }
}
