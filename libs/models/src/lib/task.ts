import { ObjectId } from 'mongoose';

export interface IBaseTask {
  title: string;
  description: string;
  projectId: ObjectId;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask extends IBaseTask {
  id: ObjectId;
}

export interface IAddTask {
  title: string;
  description: string;
  projectId: ObjectId;
  userId: ObjectId;
}

export interface IEditTask {
  _id: ObjectId;
  title: string;
  description: string;
  projectId: ObjectId;
  userId: ObjectId;
}

export interface IAllTask extends IBaseTask {
  _id: ObjectId;
}

export interface IAllTasksResponse {
  data?: IAllTask[];
  status: number;
  success: boolean;
  message: string;
}

export interface ISingleTasksResponse {
  data?: ITask;
  status: number;
  success: boolean;
  message: string;
}

export interface ITaskResponse {
  status: number;
  success: boolean;
  message: string;
}

export interface IEditTaskResponse {
  data?: ITask;
  status: number;
  success: boolean;
  message: string;
}
