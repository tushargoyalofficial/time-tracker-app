import { UserProject } from '../schemas/userProject.schema';

export default class UserProjectController {
  public async getProjectsForUser(userId: string) {
    const rec = await UserProject.find({userId})
      .populate('projectId')
      .lean();
    if (rec) {
      return {
        data: rec,
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
