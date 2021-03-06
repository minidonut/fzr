import * as R from 'ramda';
import { NotInitializedError } from '../error';
import { env } from './env';
import * as fs from 'fs-extra';
import { Config } from '../model';

const config: Config = fs.readJSONSync(env.configPath, { throws: false }) ?? {};

if (R.isEmpty(config)) {
  throw new NotInitializedError();
}

export { config };
