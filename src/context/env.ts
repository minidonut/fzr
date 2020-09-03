import * as os from 'os';
import * as path from 'path';

interface Env {
  basePath: string;
  profile: string;
  configPath: string;
  profilePath: string;
}

const basePath = process.env.FZR_PATH ?? path.join(os.homedir(), '.fzr');
const profile = process.env.FZR_PROFILE ?? 'default';
const configPath = path.join(basePath, 'config.json');
const profilePath = path.join(basePath, profile);

const env: Env = {
  basePath,
  profile,
  configPath,
  profilePath,
};

// freeze basepath
if (process.argv[2] !== 'init') {
  Object.freeze(env);
}

export { env };
