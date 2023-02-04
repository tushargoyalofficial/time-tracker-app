import { Router } from 'express';
import helloRoutes from './hello.route';
import userRoutes from './user.route';
import projectRoutes from './project.route';
import taskRoutes from './task.route';

const routes = Router();

routes.use(helloRoutes);
routes.use('/user', userRoutes);
routes.use('/project', projectRoutes);
routes.use('/task', taskRoutes);

export default routes;
