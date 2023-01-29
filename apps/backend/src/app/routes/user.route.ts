import { IAddUser } from '@time-tracker-app/models';
import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/index';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const controller = new UserController();
  const data = req.body as IAddUser;
  if (data && Object.keys(data).length !== 0 && data.name && data.email && data.password ) {
    const response = await controller.addUser(data);
    return res.status(response.status).send(response);
  } else {
    const err = {
      status: 301,
      success: false,
      message: 'Invalid or incomplete data. Required data are name, email and password',
    };
    return res.status(301).send(err);
  }
});

export default router;
