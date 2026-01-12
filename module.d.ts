declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    APP_NAME: string;
    PORT: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
