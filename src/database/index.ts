import { config } from '../context/config';
import { env } from '../context/env';
import { ProfileNotFoundError } from '../error';
import { Database, Item } from '../model';
import * as fs from 'fs-extra';
import * as path from 'path';

export const getDatabase = async (): Promise<Database | null> => {
  const databaseType = config[env.profile]?.database;
  if (!databaseType) {
    throw new ProfileNotFoundError(env.profile);
  }
  if (databaseType === 'json') {
    return JsonDatabase();
  } else {
    return null;
  }
};

const JsonDatabase = async (): Promise<Database> => {
  const json: Record<string, Item> = await fs.readJson(path.join(env.profilePath, 'database.json'));

  async function add(key: string, item: Item): Promise<Item> {
    json[key] = item;
    return item;
  }

  async function get(key: string): Promise<Item> {
    return Promise.resolve(json[key]);
  }

  async function update(key: string, item: Item): Promise<Item> {
    json[key] = item;
    return item;
  }

  async function remove(key: string): Promise<void> {
    delete json[key];
    return;
  }

  async function length(): Promise<number> {
    return Object.keys(json).length;
  }

  return {
    add,
    get,
    update,
    remove,
    length,
  };
};
