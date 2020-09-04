import { getDatabase } from '../../database';
import { env } from '../../context/env';
import * as prompts from 'prompts';
import * as chalk from 'chalk';
import * as execa from 'execa';
import * as fs from 'fs-extra';
import * as path from 'path';

const onCancel = (): void => process.exit(0);

async function command(): Promise<void> {
  const database = await getDatabase();
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

  const tmpPath = path.join(env.basePath, '.tmp');
  await fs.outputFile(
    tmpPath,
    `# url or snippet
`
  );
  await execa('vim', [tmpPath], { stdio: 'inherit' });
  const resource = fs.readFileSync(tmpPath, 'utf-8').replace('# url or snippet', '').trim();

  if (!resource) {
    // TODO custom error
    process.exit(0);
  }

  database.add({
    accessedAt: -1,
    accessedCount: 0,
    createdAt: Number(new Date()),
    body,
    resource,
    title,
  });

  console.log(`${chalk.blueBright('add')} record '${title}' 👍`);
}

export default command;
