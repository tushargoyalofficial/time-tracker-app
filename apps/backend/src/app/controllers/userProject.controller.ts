import { IUserProjectsResponse } from '@time-tracker-app/models';
import { UserProject } from '../schemas/userProject.schema';

export default class UserProjectController {
  public async getProjectsForUser(
    userId: string
  ): Promise<IUserProjectsResponse> {
    const records = await UserProject.aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: 'projects',
          localField: 'projectId',
          foreignField: '_id',
          as: 'pdata',
        },
      },
      { $unwind: '$pdata' },
      {
        $group: {
          _id: '$userId',
          projects: {
            $push: '$pdata',
          },
        },
      },
    ]);
    if (records) {
      return {
        data: records[0],
        status: 200,
        success: true,
        message: 'Records fetched successfully',
      };
    }

    return {
      status: 500,
      success: false,
      message: 'Something went wrong',
    };
  }

  public async saveProjectForUser(projectId: string, userId: string) {
    const newRec = await UserProject.create({ projectId, userId }).catch(
      console.log
    );
    if (newRec) {
      return {
        status: 200,
        success: true,
        message: 'Project for user added successfully',
      };
    }

    return {
      status: 500,
      success: false,
      message: 'Something went wrong',
    };
  }

  public async updateProjectForUser(
    id: string,
    projectId: string,
    userId: string
  ) {
    const updateRec = await UserProject.findByIdAndUpdate(id, {
      projectId,
      userId,
      updatedAt: new Date(),
    }).catch(console.log);
    if (updateRec) {
      return {
        status: 200,
        success: true,
        message: 'Project for user updated successfully',
      };
    }

    return {
      status: 500,
      success: false,
      message: 'Something went wrong',
    };
  }
}
