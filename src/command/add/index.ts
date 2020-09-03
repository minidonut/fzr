import { env } from '../../context/env';
import { getDatabase } from '../../database';
import { ProfileNotFoundError } from '../../error';
import * as prompts from 'prompts';

const onCancel = (): void => process.exit(0);

async function command(): Promise<void> {
  const database = await getDatabase();
  if (!database) {
    throw new ProfileNotFoundError(env.profile);
  }

  const { title } = await prompts(
    {
      name: 'title',
      type: 'text',
      message: 'name',
    },
    { onCancel }
  );
  if (!title) {
    // TODO custom error
    throw new Error("title can't be empty");
  }

  const { body } = await prompts(
    {
      name: 'body',
      type: 'text',
      message: 'description',
    },
    { onCancel }
  );

  const { resource } = await prompts(
    {
      name: 'resource',
      type: 'text',
      message: 'url or text',
    },
    { onCancel }
  );
  if (!resource) {
    // TODO custom error
    throw new Error("resource can't be empty");
  }

  database.add({
    accessedAt: -1,
    accessedCount: 0,
    createdAt: Number(new Date()),
    body,
    resource,
    title,
  });
}

export default command;
