import {
  IAllTasksResponse,
  ITask,
  ISingleTasksResponse,
  IAddTask,
  IEditTask,
  IEditTaskResponse,
  ITaskResponse,
  IAllTask,
} from '@time-tracker-app/models';
import { Task } from '../schemas/task.schema';

export default class TaskController {
  public async getAllTasks(
    projectId: string,
    userId: string
  ): Promise<IAllTasksResponse> {
    const tasks: IAllTask[] = await Task.find({ projectId, userId });
    return {
      data: tasks,
      status: 200,
      success: true,
      message: 'Tasks fetched successfully',
    };
  }

  public async getSingleTask(id: string): Promise<ISingleTasksResponse> {
    const task: ITask = await Task.findById(id).lean();
    if (task) {
      return {
        data: task,
        status: 200,
        success: true,
        message: 'Task fetched successfully',
      };
    }
    return {
      status: 400,
      success: false,
      message: 'No record found',
    };
  }

  public async addTask(task: IAddTask): Promise<ITaskResponse> {
    const newData = await Task.create(task).catch(console.log);
    if (newData) {
      return {
        status: 200,
        success: true,
        message: 'Task added successfully',
      };
    }

    return {
      status: 500,
      success: false,
      message: 'Something went wrong',
    };
  }

  public async editTask(task: IEditTask): Promise<IEditTaskResponse> {
    // find the existing task in record
    const editRecord: ITask = await Task.findByIdAndUpdate(
      task._id,
      {
        title: task.title,
        description: task.description,
        projectId: task.projectId,
        userId: task.userId,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (editRecord) {
      return {
        data: editRecord,
        status: 200,
        success: true,
        message: 'Task edited successfully',
      };
    }

    return {
      status: 500,
      success: false,
      message: 'Something went wrong',
    };
  }
}
