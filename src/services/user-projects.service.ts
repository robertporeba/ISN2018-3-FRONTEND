import { IUserProjects } from '../interfaces/project';
import axiosInstance from '../utils/axios';

class UserProjectsService {
	adduserproject(userProjectData: IUserProjects) {
		return axiosInstance
			.post('/userproject/add', {
				projectId: userProjectData.projectId,
				userName: userProjectData.userName,
			})
			.then((response) => {
				return response.data;
			});
	}
	getalluserprojects(id: number) {
		return axiosInstance
			.get('/userproject/getall', {
				params: {
					id,
				},
			})
			.then((response) => {
				return response.data;
			});
	}
	deleteproject(userProjectData: IUserProjects) {
		return axiosInstance
			.post('/userproject/delete', {
				projectId: userProjectData.projectId,
				userName: userProjectData.userName,
			})
			.then((response) => {
				return response.data;
			});
	}
}

export default new UserProjectsService();
