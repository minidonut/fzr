import { env } from '../context/env';
import * as path from 'path';
import * as fs from 'fs-extra';
import { spawnSync } from 'child_process';
import { IndexNotFoundError } from '../error';

export const find = (prompt = 'open'): string => {
  const indexPath = path.join(env.profilePath, 'index');
  if (!fs.existsSync(indexPath)) {
    throw new IndexNotFoundError(indexPath);
  }

  const selected = spawnSync('peco', [indexPath, '--layout=bottom-up', `--prompt=[${prompt}]`])
    .stdout.toString()
    .trim();

  if (!selected) {
    process.exit(0);
  }

  return selected;
};
