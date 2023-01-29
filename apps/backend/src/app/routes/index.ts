import { Router } from 'express';
import helloRoutes from './hello.route';
import userRoutes from './user.route'

const routes = Router();

routes.use(helloRoutes);
routes.use('/user', userRoutes);

export default routes;
