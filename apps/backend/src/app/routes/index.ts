import { Router } from 'express';
import helloRoutes from './hello.route';

const routes = Router();

routes.use(helloRoutes);

export default routes;
