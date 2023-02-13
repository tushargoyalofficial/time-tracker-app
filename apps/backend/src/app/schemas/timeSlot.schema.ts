import { IBaseTimeSlot } from '@time-tracker-app/models';
import mongoose, { model, Schema, Document, Model } from 'mongoose';

export interface ITimeSlotSchema extends IBaseTimeSlot, Document {}
export type IInstanceMethods = object;
export type ITimeSlotModel = Model<ITimeSlotSchema, object, IInstanceMethods>;

const TimeSlotSchema = new Schema<
  ITimeSlotSchema,
  ITimeSlotModel,
  IInstanceMethods
>({
  date: { type: Number, required: true },
  hours: { type: Number, required: true },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const TimeSlot: ITimeSlotModel = model<ITimeSlotSchema, ITimeSlotModel>(
  'TimeSlot',
  TimeSlotSchema
);
