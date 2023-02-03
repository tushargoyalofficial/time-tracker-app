import { ObjectId } from 'mongoose';

export interface IBaseProject {
  name: string;
  description: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject extends IBaseProject {
  id: ObjectId;
}

export interface IAddProject {
  name: string;
  description: string;
  language: string;
}

export interface IEditProject {
  _id: ObjectId;
  name: string;
  description: string;
  language: string;
}

export interface IAllProjectsResponse {
  data?: IProject[];
  status: number;
  success: boolean;
  message: string;
}

export interface ISingleProjectsResponse {
  data?: IProject;
  status: number;
  success: boolean;
  message: string;
}

export interface IProjectResponse {
  status: number;
  success: boolean;
  message: string;
}

export interface IEditProjectResponse {
  data?: IProject;
  status: number;
  success: boolean;
  message: string;
}
