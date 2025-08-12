import "reflect-metadata"
import { $log, InjectorService } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import { Server } from './Server';
import { ChatsHandler } from './generated/apis/chats/Chats.handler';


// Bootstrap application
async function bootstrap() {
  try {

    $log.info('Starting server application');
    const platform = await PlatformExpress.bootstrap(Server);
    const injector = (platform as any).injector as InjectorService;
    const bound = injector.get(ChatsHandler);
    console.log("ChatsHandler bound?", Boolean(bound), bound?.constructor?.name);
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
