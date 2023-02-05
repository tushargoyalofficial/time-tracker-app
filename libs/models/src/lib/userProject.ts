import { ObjectId } from 'mongoose';

export interface IBaseUserProject {
  userId: ObjectId;
  projectId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProject extends IBaseUserProject {
  id: ObjectId;
}

export interface IAddUserProject {
  userId: ObjectId;
  projectId: ObjectId;
}