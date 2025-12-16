import { setTimeout as sleep } from 'timers/promises';

/**
 * Runs the provided async task forever. The task can return `false` to skip the sleep for that iteration.
 * On errors, the error is logged and the loop sleeps before retrying.
 */
export const runForever = async (task: () => Promise<boolean | void>, sleepMs: number) => {
  while (true) {
    try {
      const shouldSleep = await task();
      if (shouldSleep !== false) await sleep(sleepMs);
    } catch (error) {
      console.error(error);
      await sleep(sleepMs);
    }
  }
};
