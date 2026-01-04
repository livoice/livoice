import { createConsoleLogger, getClient, IConfigCatClient, LogLevel, PollingMode } from '@configcat/sdk/node';
import env from './env';

const ensureConfigCatClient = (() => {
  let client: IConfigCatClient | null | undefined;

  return () =>
    (client =
      client ??
      getClient(env.CONFIGCAT_SDK_KEY, PollingMode.AutoPoll, {
        logger: createConsoleLogger(LogLevel.Warn),
        pollIntervalSeconds: Math.max(env.CONFIGCAT_POLL_SECONDS, 1)
      }));
})();

export const getNumber = async (key: string, defaultValue: number) => {
  try {
    const value = await ensureConfigCatClient().getValueAsync<number>(key, defaultValue);
    if (!Number.isFinite(value)) return defaultValue;
    return value;
  } catch (error) {
    console.error(`[config/flags->getNumber] failed to read ${key}, using default ${defaultValue}`, error);
    return defaultValue;
  }
};

export default {
  getNumber
};
