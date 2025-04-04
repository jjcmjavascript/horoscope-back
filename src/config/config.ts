import 'dotenv/config';

const jwtSecret = process.env.SECRET;
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.SERVER_PORT || 3001;
const origins = process.env.ORIGINS?.split(';') || 'http://localhost:3000';

export const config = {
  app: {
    port,
    isProduction,
    hoursToSearch: 8,
    hoursToSearchTarot: process.env.HOURS_TO_SEARCH_TAROT
      ? parseInt(process.env.HOURS_TO_SEARCH_TAROT)
      : 22,
    mobileKey: process.env.MOBILE_KEY,
    agent: 'mobile/horoscope',
  },
  cors: {
    origins,
    credentials: true,
  },
  jwt: {
    jwtSecret,
    jwtExpiresIn: 3600000 / 2,
    jwtRefreshExpiresIn: 3600000, // 1hr
  },
  pushNotification: {
    token: process.env.EXPO_ACCESS_TOKEN,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  aws: {
    lambda: {
      key: process.env.AWS_ACCESS_KEY,
      secret: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
      url: process.env.AWS_LAMBDA_URL,
    },
  },
  openAi: {
    key: process.env.GPTKEY,
  },
};
