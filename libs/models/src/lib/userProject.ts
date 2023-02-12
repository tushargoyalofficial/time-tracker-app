import { ObjectId } from 'mongoose';
import { IBaseProject } from '..';

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

export interface IUserProjectArray extends IBaseProject {
  _id: ObjectId;
}

export interface IUserProjectData {
  _id: ObjectId;
  projects: IUserProjectArray[];
}

export interface IUserProjectsResponse {
  data?: IUserProjectData;
  status: number;
  success: boolean;
  message: string;
}
