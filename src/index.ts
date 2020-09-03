import {
  handleRejection,
  handleException,
  UnSupportedCommandError,
  NotImplementedCommandError,
} from './error';

const cmd = process.argv[2];
const fzr = async (): Promise<void> => {
  switch (cmd) {
    /**
     *  helper command
     */
    case 'version':
    case '--version':
    case '-v': {
      require('./command/version').default();
      break;
    }
    case 'help':
    case '--help':
    case '-h':
      throw new NotImplementedCommandError('help');
      break;

    /**
     *  configuration
     */
    case 'init':
      require('./command/init').default();
      break;
    case 'status':
      throw new NotImplementedCommandError(cmd);
      break;
    case 'config':
      throw new NotImplementedCommandError(cmd);
      break;

    /**
     * backup and restore
     */
    case 'export':
      throw new NotImplementedCommandError(cmd);
      break;
    case 'import':
      throw new NotImplementedCommandError(cmd);
      break;

    /**
     * main functionality
     */
    case 'add':
      require('./command/add').default();
      break;
    case 'rm':
      require('./command/remove').default();
      break;
    case 'update':
      throw new NotImplementedCommandError(cmd);
      break;
    case 'refresh':
      throw new NotImplementedCommandError(cmd);
      break;
    default:
      if (cmd != null) {
        throw new UnSupportedCommandError(cmd);
      } else {
        require('./command/open').default();
      }
      break;
  }
};

process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleRejection);

fzr();
