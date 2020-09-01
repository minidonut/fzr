import { config } from '../../context/config';
import * as R from 'ramda';
import { NotInitializedError } from '../../error';

async function command(): Promise<void> {
  if (R.isEmpty(config)) {
    throw new NotInitializedError();
  }

  console.log('open!');
}

export default command;
