import { IBaseProject } from '@time-tracker-app/models';
import { model, Schema, Document, Model } from 'mongoose';

export interface IProjectSchema extends IBaseProject, Document {}
export type IInstanceMethods = object;
export type IProjectModel = Model<IProjectSchema, object, IInstanceMethods>;

const ProjectSchema = new Schema<
  IProjectSchema,
  IProjectModel,
  IInstanceMethods
>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const Project: IProjectModel = model<IProjectSchema, IProjectModel>(
  'Project',
  ProjectSchema
);
