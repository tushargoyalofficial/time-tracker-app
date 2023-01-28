import express, { Application } from 'express';
import cors from 'cors';
import { DBHelper } from './app/helper/db.helper';
import routes from './app/routes/index';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes); // all routes

app.get('/api', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});

DBHelper.init();
