import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import { cleanEnv, num, str } from 'envalid';

const env = cleanEnv(process.env, {
  CONFIGCAT_SDK_KEY: str(),
  CONFIGCAT_POLL_SECONDS: num({ default: 60 })
});

export default env;
