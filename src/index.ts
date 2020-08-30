import { env } from './env';
import * as command from './command';

(async (): Promise<void> => {
  switch (env.cmd) {
    case 'version':
      break;
    case 'init':
      break;
    case 'status':
      break;
    case 'help':
      break;
    case 'config':
      break;
    case 'add':
      break;
    case 'rm':
      break;
    case 'update':
      break;
    case 'refresh':
      break;
    case 'export':
      break;
    case 'import':
      break;
    default:
      if (env.cmd != null) {
        command.notSupported(env.cmd);
      }
      break;
  }
})();
