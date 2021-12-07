import { IStatus } from '../interfaces/status';
import axiosInstance from '../utils/axios';

class StatusService {
	
	getallstatuses() {
		return axiosInstance
			.get('/status/getall', {
				
			})
			.then((response) => {
				return response.data;
			});
	}

}

export default new StatusService();