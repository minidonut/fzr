import { context } from './context';
import * as command from './command';
import { handleRejection, handleException, UnSupportedCommandError, NotImplementedCommandError } from './error';

const fzr = async (): Promise<void> => {
  switch (context.cmd) {
    case 'version':
      throw new NotImplementedCommandError(context.cmd);
      break;
    case 'init':
      throw new NotImplementedCommandError(context.cmd);
      break;
    case 'status':
      throw new NotImplementedCommandError(context.cmd);
      break;
    case 'help':
      throw new NotImplementedCommandError(context.cmd);
      break;
    case 'config':
      throw new NotImplementedCommandError(context.cmd);
      break;
    case 'add':
      throw new NotImplementedCommandError(context.cmd);
      break;
    case 'rm':
      throw new NotImplementedCommandError(context.cmd);
      break;
    case 'update':
      throw new NotImplementedCommandError(context.cmd);
      break;
    case 'refresh':
      throw new NotImplementedCommandError(context.cmd);
      break;
    case 'export':
      throw new NotImplementedCommandError(context.cmd);
      break;
    case 'import':
      throw new NotImplementedCommandError(context.cmd);
      break;
    default:
      if (context.cmd != null) {
        throw new UnSupportedCommandError(context.cmd);
      } else {
        command.open();
      }
      break;
  }
};

process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleRejection);

fzr();
