import { Request, Response, Router } from 'express';
import { HelloController } from '../controllers/index';

const router = Router();

router.get('/hello', async (_req: Request, res: Response) => {
  const controller = new HelloController();
  const response = await controller.getMessage();
  return res.send(response);
});

export default router;
