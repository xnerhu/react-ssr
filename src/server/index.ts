import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import chalk from 'chalk';
import { config } from 'dotenv';
import * as compression from 'compression';

config();

import controllers from './controllers';

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(controllers);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`${chalk.cyanBright.bold('Server is running at')} ${chalk.greenBright(`http://localhost:${PORT}`)}`);
});

export default app;
