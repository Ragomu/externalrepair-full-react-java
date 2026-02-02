import dotenv from 'dotenv';
import fs from 'fs';

const currentEnv = process.argv[2];
const dotenvConfig = { path: `.env.${currentEnv}` };

dotenv.config(dotenvConfig);

fs.writeFileSync(
  './public/swenv.js',
  `
  const process = {
    env: {
      ENV: '${process.env.VITE_ENV}',
      FIREBASE_API_KEY: '${process.env.VITE_FIREBASE_API_KEY}',
      FIREBASE_AUTH_DOMAIN: '${process.env.VITE_FIREBASE_AUTH_DOMAIN}',
      FIREBASE_DB_URL: '${process.env.VITE_FIREBASE_DB_URL}',
      FIREBASE_PROJECT_ID: '${process.env.VITE_FIREBASE_PROJECT_ID}',
      FIREBASE_STORAGE_BUCKET: '${process.env.VITE_FIREBASE_STORAGE_BUCKET}',
      FIREBASE_MESSAGING_SENDER_ID: '${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID}',
      FIREBASE_APP_ID: '${process.env.VITE_FIREBASE_APP_ID}',
      FIREBASE_MEASUREMENT_ID: '${process.env.VITE_FIREBASE_MEASUREMENT_ID}',
      FIREBASE_VAPID_KEY: '${process.env.VITE_FIREBASE_VAPID_KEY}'
    }
  }
`,
);
