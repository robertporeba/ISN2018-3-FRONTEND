import { IProject } from '../interfaces/project';
import axiosInstance from '../utils/axios';
class ProjectService {
	addproject(projectData: IProject) {
		return axiosInstance
			.post('/project/add', {
				name: projectData.name,
				author: projectData.author,
			})
			.then((response) => {
				return response.data;
			});
	}
	getallprojects() {
		return axiosInstance.get('/project/getall').then((response) => {
			return response.data;
		});
	}
	deleteproject(id: number) {
		return axiosInstance.post('/project/delete?id=' + id).then((response) => {
			return response.data;
		});
	}
}

export default new ProjectService();
