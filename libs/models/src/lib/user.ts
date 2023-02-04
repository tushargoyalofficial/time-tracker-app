import { ObjectId } from 'mongoose';

export interface IBaseUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IBaseUser {
  id: ObjectId;
}

export interface IAddUser {
  name: string;
  email: string;
  password: string;
}

export interface IAddUserResponse {
  status: number;
  success: boolean;
  message: string;
}

export interface ISingleUserResponse {
  data: {
    id: ObjectId;
    name: string;
    email: string;
  };
  status: number;
  success: boolean;
  message: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginResponse {
  status: number;
  success: boolean;
  message: string;
  token?: string;
  name?: string;
  email?: string;
}
