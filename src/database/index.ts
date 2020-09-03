import { config } from '../context/config';
import { env } from '../context/env';
import { ProfileNotFoundError } from '../error';
import { Database, Item } from '../model';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as crypto from 'crypto';

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

// TODO move to constnat
const recordLength = {
  title: 30,
  body: 80,
  key: 8,
};

const generateKey = (): string => {
  return crypto.randomBytes(20).toString('hex').slice(0, 8);
};

const JsonDatabase = async (): Promise<Database> => {
  const jsonPath = path.join(env.profilePath, 'database.json');
  const json: Record<string, Item> = await fs.readJson(jsonPath);

  async function save(): Promise<void> {
    await fs.writeJson(jsonPath, json);
  }

  async function generate(): Promise<void> {
    const items = Object.entries(json);
    const records: string[] = [];
    for (const [key, item] of items) {
      const title = item.title.padEnd(recordLength.title, ' ').slice(0, recordLength.title);
      const body = item.title.padEnd(recordLength.body, ' ').slice(0, recordLength.body);

      records.push(`${title} ${body} ${key}`);
    }
    await fs.outputFile(path.join(env.profilePath, 'index'), records.join('\n'));
    return;
  }

  async function add(item: Item): Promise<Item> {
    let key = generateKey();

    // ensure no duplicate
    while (key in json) {
      key = generateKey();
    }

    json[key] = item;
    await Promise.all([save(), generate()]);
    return item;
  }

  async function get(key: string): Promise<Item> {
    const item = json[key];
    item.accessedCount++;
    item.accessedAt = Number(new Date());
    await save();
    return Promise.resolve(item);
  }

  async function update(key: string, item: Item): Promise<Item> {
    json[key] = item;
    await Promise.all([save(), generate()]);
    return item;
  }

  async function remove(key: string): Promise<void> {
    delete json[key];
    await Promise.all([save(), generate()]);
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
