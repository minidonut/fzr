import { getDatabase } from '../../database';
import * as prompts from 'prompts';
import * as path from 'path';
import * as fs from 'fs-extra';
import { env } from '../../context/env';
import * as execa from 'execa';
import * as chalk from 'chalk';

const onCancel = (): void => process.exit(0);

async function command(key: string): Promise<void> {
  const database = await getDatabase();
  const item = await database.get(key);

  const { title } = await prompts(
    {
      name: 'title',
      type: 'text',
      message: 'name',
      initial: item.title,
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
      initial: item.body,
    },
    { onCancel }
  );

  const tmpPath = path.join(env.basePath, '.tmp');
  await fs.outputFile(
    tmpPath,
    `url or snippet:
${item.resource}`
  );
  await execa('vim', [tmpPath], { stdio: 'inherit' });
  const resource = fs.readFileSync(tmpPath, 'utf-8').replace('url or snippet:', '').trim();

  if (!resource) {
    // TODO custom error
    process.exit(0);
  }

  await database.update(key, {
    accessedAt: Number(new Date()),
    accessedCount: item.accessedCount++,
    createdAt: item.createdAt,
    body,
    resource,
    title,
  });

  console.log(`${chalk.blueBright('update')} record '${title}' 👍`);
}

export default command;
