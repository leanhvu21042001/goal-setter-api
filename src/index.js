import cors from 'cors';
import colors from 'colors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import methodOverride from 'method-override';

import routes from '@/routes';
import connectDB from './config/db.config';
import logger from '@/config/logger.config';
import { port, env, morganLogFormat } from '@/config/constant.config';
import errorMiddleware from '@/middlewares/error.middleware';

// db connection
connectDB();

const app = express();

// request logging. dev: console | production: file
app.use(morgan(morganLogFormat));

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api routes
app.use(routes);

// if error is not an instanceOf APIError, convert it.
app.use(errorMiddleware.converter);

// catch 404 and forward to error handler
app.use(errorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(errorMiddleware.handler);

// listen to requests
app.listen(port, () =>
  logger.info(
    `Server started on port ${port} (${env})\n http://localhost:${port}`,
  ),
);
