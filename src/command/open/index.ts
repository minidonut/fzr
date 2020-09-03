import { config } from '../../context/config';
import { find } from '../../utils/find';

async function command(): Promise<void> {
  const selected = await find();
  console.log('open!', selected);
}

export default command;
