import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import { Server } from './Server';

// Bootstrap application
async function bootstrap() {
  try {

    $log.info('Starting server application');
    const platform = await PlatformExpress.bootstrap(Server);
    await platform.listen();

    process.on('SIGINT', () => {
      $log.info('Received SIGINT, shutting down server');
    });
  } catch (error) {
    $log.error({
      event: 'SERVER_BOOTSTRAP_ERROR',
      message: error.message,
      stack: error.stack,
    });
  }
}

bootstrap().catch($log.error);
