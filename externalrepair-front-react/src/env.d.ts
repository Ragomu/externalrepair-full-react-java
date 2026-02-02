/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />a

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_BASE_PATH: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_DB_URL: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_FIREBASE_VAPID_KEY: string;
  readonly VITE_GMT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
