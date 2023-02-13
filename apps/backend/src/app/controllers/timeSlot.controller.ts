import { IAddTimeSlot, IEditTimeSlot } from '@time-tracker-app/models';
import onlyDate from '../helper/onlyDate';
import { ITimeSlotModel, TimeSlot } from '../schemas/timeSlot.schema';

export default class TimeSlotController {
  public async getTimeSlotForTask(taskId: string) {
    const records = await TimeSlot.find({ taskId }).sort({ date: 'asc' });
    if (records) {
      return {
        data: records,
        status: 200,
        success: true,
        message: 'Time slots fetched successfully',
      };
    }

    return {
      status: 500,
      success: false,
      message: 'Something went wrong',
    };
  }

  public async addTimeSlot(data: IAddTimeSlot) {
    const { date, hours, taskId, projectId, userId } = data;
    const existingRec: ITimeSlotModel = await TimeSlot.findOne({
      date: onlyDate(date),
      taskId,
    });

    if (existingRec) {
      return {
        status: 302,
        success: false,
        message: 'Time already registered for task against provided date',
      };
    }

    const registerNewTime = await TimeSlot.create({
      date: onlyDate(date),
      hours,
      taskId,
      projectId,
      userId,
    });

    if (registerNewTime) {
      return {
        status: 200,
        success: true,
        message: 'Time registered against the task for provided date',
      };
    }

    return {
      status: 500,
      success: false,
      message: 'Something went wrong',
    };
  }

  public async editTimeSlot(data: IEditTimeSlot) {
    const { id, date, hours, taskId, projectId, userId } = data;
    const updateRec: ITimeSlotModel = await TimeSlot.findOneAndUpdate(id, {
      date: onlyDate(date),
      hours,
      taskId,
      projectId,
      userId,
    });

    if (updateRec) {
      return {
        status: 200,
        success: false,
        message: 'Time slot data updated successfully',
      };
    }

    return {
      status: 500,
      success: false,
      message: 'Something went wrong',
    };
  }
}
