declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    APP_NAME: string;
    PORT: string;
    NODE_ENV: 'development' | 'production' | 'test';
    GMAIL_EMAIL: string;
    GMAIL_APP_PASSWORD: string;
    CLIENT_URL: string;
    APP_LOGO: string;
    FILE_URL: string;
    ACCESS_TOKEN_SECRET_KEY: string;
    REFRESH_TOKEN_SECRET_KEY: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
  }
}
