// noinspection JSUnresolvedReference

import { Configuration, DIConfiguration, Inject } from '@tsed/di';
import { $log, PlatformApplication } from '@tsed/common';

import '@tsed/platform-express'; // keep this import!
import '@tsed/ajv'; // keep this import!
import '@tsed/swagger'; // keep this import!
import config, { ServerConfiguration } from '~/config';
import * as generatedControllers from '~/generated/apis';
import { getRequiredEnv } from '~/config/configs/utils';

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

const serverConfiguration: ServerConfiguration = {
  ...config,
  cache: {
    ttl: 60 * 1000 * 5, // ms
  },
  acceptMimes: ['application/json', 'application/xml'],
  httpPort: parseInt(getRequiredEnv('PORT'), 10),
  httpsPort: false,
  disableComponentsScan: true,
  mount: {
    '/': [...Object.values(generatedControllers)],
  },
  rawBody: true,
  middlewares: [
    cors,
    'method-override',
    'json-parser',
    { use: 'urlencoded-parser', options: { extended: true } },
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
  protected app: PlatformApplication;

  @Configuration()
  protected settings: ServiceConfiguration;
}
