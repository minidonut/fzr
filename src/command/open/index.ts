import { config } from '../../context/config';

async function command(): Promise<void> {
  console.log('open!', config);
}

export default command;
