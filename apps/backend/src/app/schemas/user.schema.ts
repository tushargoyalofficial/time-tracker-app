import { IBaseUser } from '@time-tracker-app/models';
import { model, Schema, Document, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

const saltRounds = 10;

export interface IUserSchema extends IBaseUser, Document {}
export type IInstanceMethods = {
  comparePassword: (password: string) => void;
};
export type IUserModel = Model<IUserSchema, null, IInstanceMethods>;

const UserSchema: Schema = new Schema({
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

UserSchema.methods.comparePassword = function (password: string, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

export const User = model<IUserModel>('User', UserSchema);
