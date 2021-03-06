import * as chalk from 'chalk';
import * as os from 'os';
import { box } from '../utils/box';

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

export class NotInitializedError extends BaseError {
  constructor() {
    super();
  }

  get message(): string {
    return box(`Hi  ${chalk.yellowBright(os.userInfo().username)} 😎

We need to intialize app before start

run ${chalk.greenBright('fzr init')}`);
  }
}

export class IndexNotFoundError extends BaseError {
  filepath: string;
  constructor(filepath: string) {
    super();
    this.filepath = filepath;
  }

  get message(): string {
    return box(`😔 failed to load index file

'${chalk.blueBright(this.filepath)}'`);
  }
}

export class ProfileNotFoundError extends BaseError {
  profile: string;
  constructor(profile: string) {
    super();
    this.profile = profile;
  }

  get message(): string {
    return box(`😔 failed to load profile '${chalk.greenBright(this.profile)}'`);
  }
}
