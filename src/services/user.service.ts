import axiosInstance from '../Utils/axios';

class UserService {
	getUserInfo() {
		return axiosInstance.get('/user/getinfo').then((response) => {
			return response.data;
		});
	}
}

export default new UserService();
