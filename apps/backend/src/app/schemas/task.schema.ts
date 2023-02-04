import { IBaseTask } from '@time-tracker-app/models';
import mongoose, { model, Schema, Document, Model } from 'mongoose';

export interface ITaskSchema extends IBaseTask, Document {}
export type IInstanceMethods = object;
export type ITaskModel = Model<ITaskSchema, object, IInstanceMethods>;

const TaskSchema = new Schema<ITaskSchema, ITaskModel, IInstanceMethods>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  projectId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  ],
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const Task: ITaskModel = model<ITaskSchema, ITaskModel>(
  'Task',
  TaskSchema
);
