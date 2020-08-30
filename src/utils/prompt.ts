import { box } from '../printer/box';

export const onCancel = (action: string) => (): void => {
  console.log(box(`${action} canceled. 🤔`));
  process.exit(0);
};
