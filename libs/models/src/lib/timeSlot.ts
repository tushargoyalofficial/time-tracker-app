import { ObjectId } from 'mongoose';

export interface IBaseTimeSlot {
  date: Date;
  hours: number;
  taskId: ObjectId;
  projectId: ObjectId;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITimeSlot extends IBaseTimeSlot {
  id: ObjectId;
}

export interface IAddTimeSlot {
  date: Date;
  hours: number;
  taskId: ObjectId;
  projectId: ObjectId;
  userId: ObjectId;
}

export interface IEditTimeSlot {
  id: ObjectId;
  date: Date;
  hours: number;
  taskId: ObjectId;
  projectId: ObjectId;
  userId: ObjectId;
}
