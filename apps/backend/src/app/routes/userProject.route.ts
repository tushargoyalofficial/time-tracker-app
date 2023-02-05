
import { Request, Response, Router } from 'express';
import UserProjectController from '../controllers/userProject.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = Router();
router.use(deserializeUser, requireUser);

router.get('/all', async (_req: Request, res: Response) => {
  const controller = new UserProjectController();
  const response = await controller.getProjectsForUser(res.locals.user.data.id);
  return res.status(response.status).send(response);
});

export default router;