import { env } from './env';
import * as fs from 'fs-extra';

let config = fs.readJSONSync(env.configPath, { throws: false }) ?? {};

export { config };
