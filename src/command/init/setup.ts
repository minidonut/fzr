import { context } from '../../context';
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
  const { basepath, profile } = context;
  const profilePath = path.join(basepath, profile);
  if (database === 'json') {
    fs.writeFileSync(path.join(profilePath, 'database.json'), '{}');
  }

  const configPath = path.join(basepath, 'config.json');
  const config = { [profile]: { database } };
  const oldConfig = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf-8')) : {};

  // prettier-ignore
  fs.writeFileSync(
    configPath,
    JSON.stringify({...oldConfig, ...config}, undefined, 2)
  );
  return;
}

async function setupProfile(): Promise<void> {
  const { basepath, profile } = context;

  // todo make it setter
  const profilePath = path.join(basepath, profile);
  if (fs.existsSync(profilePath)) {
    throw new FileAlreadyExistError(profilePath, 'profile directory');
  }
  await fs.ensureDir(profilePath);
  return;
}

async function setupBasepath(): Promise<void> {
  const { basepath } = context;
  // create base directory
  await fs.ensureDir(basepath);
  return;
}
