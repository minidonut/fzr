import { find } from '../../utils/find';

async function command(): Promise<void> {
  const selected = await find('open');
  const key = selected.slice(132);
  return require('./open').default(key);
}

export default command;
