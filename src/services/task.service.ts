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

	gettask(id: number) {
		return axiosInstance.get('/task/get?id=' + id).then((response) => {
			return response.data;
		});
	}
	deletetask(id: number) {
		return axiosInstance.post('/task/delete?id=' + id).then((response) => {
			return response.data;
		});
	}
	changestatus(statusData: any) {
		return axiosInstance
			.post('/task/changestatus', {
				id: statusData.id,
				statusId: statusData.statusId,
				projectId: statusData.projectId,
			})
			.then((response) => {
				return response.data;
			});
	}
	updatetask(statusData: any) {
		return axiosInstance
			.post('/task/update', {
				id: statusData.id,
				name: statusData.name,
				description: statusData.description,
				assignedUser: statusData.assignedUser,
				priorityId: statusData.priorityId,
				fileName:statusData.fileName,
				formFile:statusData.formFile,
			})
			.then((response) => {
				return response.data;
			});
	}
}

export default new TaskService();
