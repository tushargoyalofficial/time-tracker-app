export interface IBaseUser {
  name: string;
  email: string;
  password: string;
  createAt: string;
  updatedAt: string;
}

export interface IUser extends IBaseUser {
  id: string;
}

export interface IUserResponse {
  token: string;
  name: string;
  email: string;
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
