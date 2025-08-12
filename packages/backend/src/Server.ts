// noinspection JSUnresolvedReference

import { Configuration, DIConfiguration, Inject, InjectorService, ProviderType } from '@tsed/di';
import { $log, PlatformApplication } from '@tsed/common';
import compression from 'compression';

import '@tsed/platform-express'; // keep this import!
import '@tsed/ajv'; // keep this import!
import { memoryStore } from 'cache-manager';
import '@tsed/swagger'; // keep this import!
import methodOverride from 'method-override';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import config, { ServerConfiguration } from '~/config';
import * as generatedControllers from '~/generated/apis';
import { getRequiredEnv } from '~/config/configs/utils';
import { PaginationResponseFilter } from '~/core/page/PaginationResponseFilter';
import '~/handlers';
import { Application } from 'express';
import { ChatsHandler } from './generated/apis/chats/Chats.handler';
import { ChatsHandlerImpl } from '~/handlers';
import { ChatSseService, DiscordBridgeService } from './services';
// Cors
const cors = {
  use: 'cors',
  options: {
    origin: [
      config.box.baseUrls.frontend,
      config.box.baseApi,
    ],
    methods: 'GET,HEAD,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
  },
};

if (config.box.isLocal) {
  $log.appenders.set('stdout', {
    type: 'stdout',
    levels: ['info', 'debug'],
    layout: {
      type: 'local',
    },
  });
  $log.appenders.set('stderr', {
    type: 'stderr',
    levels: ['trace', 'fatal', 'error', 'warn'],
    layout: {
      type: 'local',
    },
  });
} else {
  // Also add www. subdomain
  cors.options.origin.push(
    config.box.baseUrls.frontend.replace('https://', 'https://www.'),
    config.box.baseApi.replace('https://', 'https://www.'),
  );

  // Logs to be JSON
  $log.appenders.set('stdout', {
    type: 'stdout',
    levels: ['info', 'debug'],
    layout: {
      type: 'streamedJsonLog',
    },
  });
  $log.appenders.set('stderr', {
    type: 'stderr',
    levels: ['trace', 'fatal', 'error', 'warn'],
    layout: {
      type: 'streamedJsonLog',
    },
  });
}

cors.options.origin.push('http://localhost:8000');


const serverConfiguration: ServerConfiguration = {
  ...config,
  cache: {
    ttl: 60 * 1000 * 5, // ms
    store: memoryStore,
  },
  acceptMimes: ['application/json', 'application/xml'],
  httpPort: parseInt(getRequiredEnv('PORT'), 10),
  httpsPort: false,
  disableComponentsScan: true,
  mount: {
    '/': [...Object.values(generatedControllers)],
  },
  responseFilters: [PaginationResponseFilter],
  rawBody: true,
  middlewares: [
    cors,
    cookieParser(),
    methodOverride(),
    compression(),
    { use: 'json-parser'},
    { use: 'urlencoded-parser', options: { extended: true } },
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
          scriptSrc: ["'self'", "'unsafe-inline'", 'https:'],
        },
      },
    }),
  ],
  exclude: ['**/*.spec.ts'],
  // the views settings
  views: {
    root: `${__dirname}/views`,
    viewEngine: 'ejs',
  },
};

// Enable swagger on local
if (config.box.isLocal) {
  serverConfiguration.swagger = [
    {
      path: '/v3/docs',
      specVersion: '3.0.1',
    },
  ];
}

type ServiceConfiguration = DIConfiguration & ServerConfiguration;

@Configuration(serverConfiguration)
export class Server {

  @Inject() 
  injector!: InjectorService;

  @Configuration()
  protected settings: ServiceConfiguration;

  $afterInit() {
    // Initialize the class-validator injection
    const injector = this.injector;
    useContainer(
      {
        get<T>(type: ProviderType): T | undefined {
          return injector.hasProvider(type)
            ? (injector.get<T>(type) as T)
            : undefined;
        },
      },
      { fallback: true },
    );
  }
}
