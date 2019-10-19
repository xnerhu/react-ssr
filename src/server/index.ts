import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import chalk from 'chalk';
import { config } from 'dotenv';

config();

import controllers from './controllers';

const app = express();

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(controllers);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`${chalk.cyanBright.bold('Server is running at')} ${chalk.greenBright(`http://localhost:${PORT}`)}`);
});

export default app;
