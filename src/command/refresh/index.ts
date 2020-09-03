import { getDatabase } from '../../database';

async function command(): Promise<void> {
  const database = await getDatabase();
  await database.refresh();
}

export default command;
