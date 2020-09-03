export type DatabaseType = 'json' | 'sqlite' | 'dynamodb' | 'mysql';
export type Profile = {
  database: string;
  data: Record<string, string | number>;
};
export type Config = Record<string, Profile>;
export interface Item {
  title: string;
  resource: string;
  body: string;
  createdAt: number;
  accessedAt: number;
  accessedCount: number;
}
export interface Database {
  create: (key: string, item: Item) => Promise<Item>;
  read: (key: string) => Promise<Item>;
  update: (key: string, item: Item) => Promise<Item>;
  delete: (key: string) => Promise<void>;
  length: () => Promise<number>;
}
