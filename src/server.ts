import { createServer } from 'http';
import { config } from 'dotenv';
import { resolve } from 'path';
/**
 * Load Env
 */
config({ path: resolve(__dirname, '../.env') });

/**
 * Load App
 */
import app from './app';
import sequelize from './utils/dbConfig';
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from './utils/swagger/swagger.json';

const server = createServer(app);
const port = process.env.PORT || 8080;

function exitHandler() {
  server.close(async () => {
    console.log(`Http server closed.`);
    await sequelize.close();
    console.log(`Db connection disconnected`);
    process.exit(1);
  });
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`, `EADDRINUSE`].forEach((eventType) => {
  (process as NodeJS.EventEmitter).on(eventType, exitHandler.bind(null, eventType));
});

(async () => {
  try {
    await sequelize.authenticate();
    console.info(`DB Connection has been established successfully`, ``);

    server.listen(port, () => {
      console.info(`Server is running on ${port}`, ``);
      app.use('/swagger', serve, setup(swaggerDocument));
    });
  } catch (e) {
    console.error(`Unable to connect to the server ${e}`);
    process.exit(1);
  }
})();

export { server };
