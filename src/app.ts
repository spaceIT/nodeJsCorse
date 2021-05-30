import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

const app = express();
const swaggerDocument = YAML.load(path.join(dirName, '../doc/api.yaml'));

app.use(express.json());

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

export default app;
