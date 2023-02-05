import { IBaseUserProject } from '@time-tracker-app/models';
import mongoose, { model, Schema, Document, Model } from 'mongoose';

export interface IUserProjectSchema extends IBaseUserProject, Document {}
export type IInstanceMethods = object;
export type IUserProjectModel = Model<
  IUserProjectSchema,
  object,
  IInstanceMethods
>;

const UserProjectSchema = new Schema<
  IUserProjectSchema,
  IUserProjectModel,
  IInstanceMethods
>({
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

export const UserProject: IUserProjectModel = model<
  IUserProjectSchema,
  IUserProjectModel
>('UserProject', UserProjectSchema);
