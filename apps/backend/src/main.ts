import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import { DBHelper } from './app/helper/db.helper';
import routes from './app/routes/index';

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app: Application = express();

app.use(express.json({ limit: '10kb' }));
app.use(
  cors({
    origin: [`${process.env.ORIGIN}`, `${process.env.FRONTEND_ORIGIN}`],
    credentials: true,
  })
);

app.use('/api', routes); // all routes

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});

DBHelper.init();
