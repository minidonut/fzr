import { context } from '../../context';
import { DatabaseType } from '../../model';

interface SetupProps {
  database: DatabaseType;
}

export async function setup({ database }: SetupProps): Promise<void> {
  return;
}
