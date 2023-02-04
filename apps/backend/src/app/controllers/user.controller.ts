import {
  IAddUser,
  IAddUserResponse,
  ILoginResponse,
  ILoginUser,
  ISingleUserResponse,
} from '@time-tracker-app/models';
import { IUserModel, IUserSchema, User } from '../schemas/user.schema';
import { signJwt } from '../utils/jwt';

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

    return {
      status: 500,
      success: false,
      message: 'Something went wrong',
    };
  }

  public async getSingleUser(id: string): Promise<ISingleUserResponse> {
    const user = await User.findById(id).lean();
    return {
      data: { id: user._id, name: user.name, email: user.email },
      status: 200,
      success: true,
      message: 'User fetched successfully',
    };
  }

  public async login(data: ILoginUser): Promise<ILoginResponse> {
    // find if user exists or not
    const userRecord: IUserSchema & IUserModel = await User.findOne({
      email: data.email,
    });

    if (userRecord) {
      const isMatch: boolean = userRecord.schema.methods.comparePassword(
        data.password,
        userRecord.password
      );

      if (isMatch) {
        // get access token
        const accessToken = signJwt(
          {
            sub: userRecord._id,
          },
          {
            expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`,
          }
        );

        return {
          status: 200,
          success: isMatch,
          token: accessToken,
          message: 'Login successful',
        };
      }

      return {
        status: 500,
        success: isMatch,
        message: 'Wrong password',
      };
    }

    return {
      status: 400,
      success: false,
      message: 'User not registerd with us',
    };
  }
}
