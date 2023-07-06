import * as http from 'http';
import cluster from 'cluster';
import * as sticky from 'sticky-session';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
import { handleRequest } from './api/routes/usersRoutes';


dotenv.config();

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  handleRequest(req, res);
});

if (cluster.isPrimary) {
  const numWorkers: number = require('os').cpus().length - 1;

  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker: Worker, code: number, signal: string) => {
    console.log(`Worker process ${process.pid} died`);
    cluster.fork(); // Fork a new worker process to replace the dead one
  });
} else {
  const port: number = Number(process.env.PORT) || 4000;


  sticky.listen(server, port);
  console.log(`Worker process ${process.pid} is running on port ${port}`);
}
