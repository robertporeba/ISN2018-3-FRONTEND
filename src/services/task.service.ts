import { IProject } from '../interfaces/project';
import axiosInstance from '../utils/axios';
class TaskService {
	addtask(taskData: any) {
		return axiosInstance
			.post('/task/add', {
				name: taskData.name,
				author: taskData.author,
				assignedUser: taskData.assignedUser,
				statusId: taskData.statusId,
				priorityId: taskData.priorityId,
				projectId: taskData.projectId,
			})
			.then((response) => {
				return response.data;
			});
	}
	getalltasks(id: number) {
		return axiosInstance.get('/task/getall?id=' + id).then((response) => {
			return response.data;
		});
	}
	deletetask(id: number) {
		return axiosInstance.post('/project/delete?id=' + id).then((response) => {
			return response.data;
		});
	}
}

export default new TaskService();
