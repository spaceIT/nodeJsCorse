import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { logError, logRequest } from './middleware/logger';
import { ErrorHandler, handleError } from './errors/error';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);
const app = express();
const swaggerDocument = YAML.load(path.join(dirName, '../doc/api.yaml'));

app.use(express.json());
app.use(logRequest);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use('/boards', boardRouter);

app.use((err: Error | ErrorHandler, _req: Request, res: Response, next: NextFunction) => {
  const error = err instanceof ErrorHandler ? err : new ErrorHandler(500, 'Internal server error');
  logError(error);

  handleError(error, res);
  next(err);
});

process.on('uncaughtException', (err) => {
  logError(err);
});

process.on('unhandledRejection', (_reason, promise) => {
  promise.catch((error) => {
    logError(error);
  });
});
Promise.reject(Error('Oops!'))
export default app;
