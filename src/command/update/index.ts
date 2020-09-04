import { find } from '../../utils/find';

async function command(): Promise<void> {
  const selected = await find('update');
  const key = selected.slice(132);
  return require('./update').default(key);
}

export default command;
