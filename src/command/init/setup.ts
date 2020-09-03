import { env } from '../../context/env';
import { DatabaseType } from '../../model';
import * as fs from 'fs-extra';
import * as path from 'path';
import { FileAlreadyExistError } from '../../error';

interface SetupProps {
  database: DatabaseType;
}

export async function setup({ database }: SetupProps): Promise<void> {
  try {
    await setupBasepath();
    await setupProfile();
    await setupDatabase(database);
  } catch (e) {
    // handle all errors inside function
    // to remove failure garbages
    console.error(e.message);
  }

  return;
}

async function setupDatabase(database: DatabaseType): Promise<void> {
  const { basePath, profile, profilePath } = env;

  // TODO - make 'database.json' constant
  // handle database case
  if (database === 'json') {
    fs.writeFileSync(path.join(profilePath, 'database.json'), '{}');
  }

  // TODO - make 'index', 'config.json' constant
  // generate index
  fs.writeFileSync(path.join(profilePath, 'index'), '');

  const configPath = path.join(basePath, 'config.json');
  const config = { [profile]: { database } };
  const oldConfig = fs.existsSync(configPath)
    ? JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    : {};

  // prettier-ignore
  fs.writeFileSync(
    configPath,
    JSON.stringify({...oldConfig, ...config}, undefined, 2)
  );
  return;
}

async function setupProfile(): Promise<void> {
  const { basePath, profile } = env;

  const profilePath = path.join(basePath, profile);
  if (fs.existsSync(profilePath)) {
    throw new FileAlreadyExistError(profilePath, 'profile directory');
  }
  await fs.ensureDir(profilePath);
  return;
}

async function setupBasepath(): Promise<void> {
  const { basePath } = env;
  // create base directory
  await fs.ensureDir(basePath);
  return;
}
