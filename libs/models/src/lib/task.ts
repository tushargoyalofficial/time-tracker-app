import { ObjectId } from 'mongoose';

export interface IBaseTask {
  title: string;
  description: string;
  projectId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask extends IBaseTask {
  id: ObjectId;
}