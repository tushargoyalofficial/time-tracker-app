import { IAddTimeSlot, IEditTimeSlot } from '@time-tracker-app/models';
import { Request, Response, Router } from 'express';
import TimeSlotController from '../controllers/timeSlot.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = Router();
router.use(deserializeUser, requireUser);

router.get('/all/:taskId', async (req: Request, res: Response) => {
  const controller = new TimeSlotController();
  if (req.params.taskId) {
    const response = await controller.getTimeSlotForTask(req.params.taskId);
    return res.status(response.status).send(response);
  }

  const err = {
    status: 301,
    success: false,
    message: 'Invalid or incomplete data. Required data taskId',
  };
  return res.status(301).send(err);
});

router.post('/add', async (req: Request, res: Response) => {
  const controller = new TimeSlotController();
  const data = req.body as IAddTimeSlot;

  if (
    data &&
    Object.keys(data).length !== 0 &&
    data.date &&
    data.hours &&
    data.taskId &&
    data.projectId
  ) {
    if (res.locals.user) {
      const response = await controller.addTimeSlot({
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
        'Invalid or incomplete data. Required data are date, hours, taskId and projectId',
    };
    return res.status(301).send(err);
  }
});

router.post('/edit', async (req: Request, res: Response) => {
  const controller = new TimeSlotController();
  const data = req.body as IEditTimeSlot;

  if (
    data &&
    Object.keys(data).length !== 0 &&
    data.id &&
    data.date &&
    data.hours &&
    data.taskId &&
    data.projectId
  ) {
    if (res.locals.user) {
      const response = await controller.editTimeSlot({
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
        'Invalid or incomplete data. Required data are id, date, hours, taskId and projectId',
    };
    return res.status(301).send(err);
  }
});

export default router;
