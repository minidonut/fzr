import * as os from 'os';
import * as path from 'path';

const context = {
  basepath: process.env.FZR_PATH ?? path.join(os.homedir(), '.fzr'),
  profile: process.env.FZR_PROFILE ?? 'default',
};

// freeze basepath
if (process.argv[2] !== 'init') {
  Object.freeze(context);
}

export { context };
