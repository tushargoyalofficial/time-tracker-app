import { IAddProject, IEditProject } from '@time-tracker-app/models';
import { Request, Response, Router } from 'express';
import { ProjectController } from '../controllers/index';

const router = Router();

router.get('/all', async (_req: Request, res: Response) => {
  const controller = new ProjectController();
  const response = await controller.getAllProjects();
  return res.status(response.status).send(response);
});

router.get('/:id', async (req: Request, res: Response) => {
  const controller = new ProjectController();
  if (req.params.id) {
    const response = await controller.getSingleProjects(req.params.id);
    return res.status(response.status).send(response);
  }
  return {
    status: 404,
    success: false,
    message: 'Project id not provided',
  };
});

router.post('/add', async (req: Request, res: Response) => {
  const controller = new ProjectController();
  const data = req.body as IAddProject;

  if (
    data &&
    Object.keys(data).length !== 0 &&
    data.name &&
    data.description &&
    data.language
  ) {
    const response = await controller.addProject(data);
    return res.status(response.status).send(response);
  } else {
    const err = {
      status: 301,
      success: false,
      message:
        'Invalid or incomplete data. Required data are name, description and language',
    };
    return res.status(301).send(err);
  }
});

router.post('/edit', async (req: Request, res: Response) => {
  const controller = new ProjectController();
  const data = req.body as IEditProject;

  if (
    data &&
    Object.keys(data).length !== 0 &&
    data._id &&
    data.name &&
    data.description &&
    data.language
  ) {
    const response = await controller.editProject(data);
    return res.status(response.status).send(response);
  } else {
    const err = {
      status: 301,
      success: false,
      message:
        'Invalid or incomplete data. Required data are id, name, description and language',
    };
    return res.status(301).send(err);
  }
});

export default router;
