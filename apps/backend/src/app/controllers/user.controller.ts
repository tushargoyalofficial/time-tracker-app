import { IAddUser, IAddUserResponse } from '@time-tracker-app/models';
import { IUserModel, User } from '../schemas/user.schema';

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
    const newUser: IUserModel | void = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    }).catch(
      console.log
    );
    if (newUser) {
      return {
        status: 200,
        success: true,
        message: 'User registered successfully',
      };
    }

    return null;
  }
}
