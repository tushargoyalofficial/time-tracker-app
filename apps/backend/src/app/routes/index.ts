import { Router } from 'express';
import helloRoutes from './hello.route';
import userRoutes from './user.route';
import projectRoutes from './project.route';
import taskRoutes from './task.route';
import userProjectRoutes from './userProject.route';
import timeSlotRoutes from './timeSlot.route';

const routes = Router();

routes.use(helloRoutes);
routes.use('/user', userRoutes);
routes.use('/project', projectRoutes);
routes.use('/task', taskRoutes);
routes.use('/userProject', userProjectRoutes);
routes.use('/timeSlot', timeSlotRoutes);

export default routes;
