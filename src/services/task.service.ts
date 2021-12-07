import { ITask } from '../interfaces/task';
import axiosInstance from '../utils/axios';
class TaskService {
	addtask(taskData: ITask) {
		return axiosInstance
			.post('/task/add', {
				name: taskData.name,
				author: taskData.author,
                assignedUser:taskData.assignedUser,
                statusId: taskData.statusId,
                priorityId: taskData.priorityId,
                projectId: taskData.projectId
			})
			.then((response) => {
				return response.data;
			});
	}

	getalltasks() {
		return axiosInstance
			.get('/task/getall', {
				
			})
			.then((response) => {
				return response.data;
			});
	}
	
}

export default new TaskService();