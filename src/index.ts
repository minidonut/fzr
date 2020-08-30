import { context } from './context';
import * as command from './command';
import { handleRejection, handleException, UnSupportedError } from './error';

const fzr = async (): Promise<void> => {
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
        throw new UnSupportedError(`Command '${context.cmd}' is not supported 😔`);
      } else {
        command.open();
      }
      break;
  }
};

process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleRejection);

fzr();
