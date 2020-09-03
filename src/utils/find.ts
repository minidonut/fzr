import { env } from '../context/env';
import * as path from 'path';
import * as fs from 'fs-extra';
import { spawn } from 'child_process';
import { IndexNotFoundError } from '../error';

export const find = async (prompt = 'open'): Promise<string> => {
  const indexPath = path.join(env.profilePath, 'index');
  if (!fs.existsSync(indexPath)) {
    throw new IndexNotFoundError(indexPath);
  }
  return new Promise(resolve => {
    const peco = spawn('peco', [indexPath, '--layout=bottom-up', `--prompt=[${prompt}]`]);

    let selected = '';
    peco.stdout.on('data', data => {
      selected += data;
    });

    peco.stdout.on('end', () => {
      if (!selected) {
        // canceled
        process.exit(0);
      }
      resolve(selected.trim());
    });
  });
};
