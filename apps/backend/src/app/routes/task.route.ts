import { IAddTask, IEditTask } from '@time-tracker-app/models';
import { Request, Response, Router } from 'express';
import { TaskController } from '../controllers/index';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = Router();
router.use(deserializeUser, requireUser);

router.get('/all', async (req: Request, res: Response) => {
  const controller = new TaskController();
  if (req.body.projectId) {
    const response = await controller.getAllTasks(
      req.body.projectId,
      res.locals.user.data.id
    );
    return res.status(response.status).send(response);
  }
  const err = {
    status: 301,
    success: false,
    message: 'Invalid or incomplete data. Required data projectId',
  };
  return res.status(301).send(err);
});

router.get('/:id', async (req: Request, res: Response) => {
  const controller = new TaskController();
  if (req.params.id) {
    const response = await controller.getSingleTask(req.params.id);
    return res.status(response.status).send(response);
  }
  return {
    status: 404,
    success: false,
    message: 'Task id not provided',
  };
});

router.post('/add', async (req: Request, res: Response) => {
  const controller = new TaskController();
  const data = req.body as IAddTask;

  if (
    data &&
    Object.keys(data).length !== 0 &&
    data.title &&
    data.description &&
    data.projectId
  ) {
    if (res.locals.user) {
      const response = await controller.addTask({
        ...data,
        userId: res.locals.user.data.id,
      });
      return res.status(response.status).send(response);
    }
  } else {
    const err = {
      status: 301,
      success: false,
      message:
        'Invalid or incomplete data. Required data are title, description, projectId and userId',
    };
    return res.status(301).send(err);
  }
});

router.post('/edit', async (req: Request, res: Response) => {
  const controller = new TaskController();
  const data = req.body as IEditTask;

  if (
    data &&
    Object.keys(data).length !== 0 &&
    data._id &&
    data.title &&
    data.description &&
    data.projectId &&
    data.userId
  ) {
    const response = await controller.editTask(data);
    return res.status(response.status).send(response);
  } else {
    const err = {
      status: 301,
      success: false,
      message:
        'Invalid or incomplete data. Required data are id, title, description, projectId and userId',
    };
    return res.status(301).send(err);
  }
});

export default router;
