import { context } from './context';
import * as command from './command';

(async (): Promise<void> => {
  switch (context.cmd) {
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
      if (context.cmd != null) {
        command.notSupported(context.cmd);
      } else {
        command.open();
      }
      break;
  }
})();
