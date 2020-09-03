import { config } from '../../context/config';
import { find } from '../../utils/find';
import { getDatabase } from '../../database';

async function command(): Promise<void> {
  const [selected, database] = await Promise.all([find(), getDatabase()]);
  const key = selected.slice(132);
  const item = await database.get(key);
  console.log('open!', key);
}

export default command;
