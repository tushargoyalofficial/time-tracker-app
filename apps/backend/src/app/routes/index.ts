import { Router } from 'express';
import helloRoutes from './hello.route';
import userRoutes from './user.route';
import projectRoutes from './project.route';

const routes = Router();

routes.use(helloRoutes);
routes.use('/user', userRoutes);
routes.use('/project', projectRoutes);

export default routes;
