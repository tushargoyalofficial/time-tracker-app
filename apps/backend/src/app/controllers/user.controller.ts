import {
  IAddUser,
  IAddUserResponse,
  ILoginResponse,
  ILoginUser,
} from '@time-tracker-app/models';
import { IUserModel, IUserSchema, User } from '../schemas/user.schema';

export default class UserController {
  public async addUser(user: IAddUser): Promise<IAddUserResponse> {
    // find by email if users is already exists
    const userRecord: IUserModel = await User.findOne({ email: user.email });

    // if user exists
    if (userRecord) {
      return {
        status: 400,
        success: false,
        message: 'User already registered with us',
      };
    }

    // Register user if it not exists in db
    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    }).catch(console.log);
    if (newUser) {
      return {
        status: 200,
        success: true,
        message: 'User registered successfully',
      };
    }

    return null;
  }

  public async login(data: ILoginUser): Promise<ILoginResponse> {
    // find if user exists or not
    const userRecord: IUserSchema & IUserModel = await User.findOne({
      email: data.email,
    });

    if (userRecord) {
      const isMatch: boolean = userRecord.schema.methods.comparePassword(
        data.password, userRecord.password
      );
      return {
        status: isMatch ? 200 : 500,
        success: isMatch,
        message: isMatch ? 'Login successful' : 'Wrong password',
      };
    }
  }
}
