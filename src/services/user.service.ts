import axiosInstance from '../utils/axios';

class UserService {
	getUserInfo() {
		return axiosInstance.get('/user/getinfo').then((response) => {
			return response.data;
		});
	}
}

export default new UserService();
