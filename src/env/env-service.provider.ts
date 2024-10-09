import { EnvServiceService } from "./env-service.service";

export const EnvServiceFactory = () => {
  const env: EnvServiceService = new EnvServiceService();

  const browserWindows: any = window || {};
  const browserWindowsEnv: { [key: string]: string } =
    browserWindows['_env'] || {};

  for (const key in browserWindowsEnv) {
    if (browserWindowsEnv.hasOwnProperty(key)) {
      // @ts-ignore
      env[key] = browserWindowsEnv[key];
    }
  }
  return env;
};

export const EnvServiceProvider = {
  provide: EnvServiceService,
  useFactory: EnvServiceFactory,
  deps: [],
};
