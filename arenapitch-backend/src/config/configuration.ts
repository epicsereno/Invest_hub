export const configuration = () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000',
  jwt: {
    secret: process.env.JWT_SECRET ?? 'development-only-secret',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
