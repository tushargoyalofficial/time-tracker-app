import { IBaseUser } from '@time-tracker-app/models';
import { model, Schema, Document, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

const saltRounds = 10;

export interface IUserSchema extends IBaseUser, Document {}
export type IInstanceMethods = {
  comparePassword: (password: string, hashedPassword: string) => boolean;
};
export type IUserModel = Model<IUserSchema, object, IInstanceMethods>;

const UserSchema = new Schema<IUserSchema, IUserModel, IInstanceMethods>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

UserSchema.pre<IUserSchema>('save', function (next) {
  const user = this as IUserSchema;
  if (user.isModified('password') || user.isNew) {
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.method('comparePassword', function (password: string, hashedPassword: string): boolean {
  if (bcrypt.compareSync(password, hashedPassword)) return true;
  return false;
});

export const User: IUserModel = model<IUserSchema, IUserModel>('User', UserSchema);
