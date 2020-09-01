import * as os from 'os';
import * as path from 'path';

interface Env {
  basePath: string;
  profile: string;
  configPath?: string;
}

const env: Env = {
  basePath: process.env.FZR_PATH ?? path.join(os.homedir(), '.fzr'),
  profile: process.env.FZR_PROFILE ?? 'default',
  configPath: undefined,
};

env.configPath = env.basePath;

// freeze basepath
if (process.argv[2] !== 'init') {
  Object.freeze(env);
}

export { env };
