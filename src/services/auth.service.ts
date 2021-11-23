import { IAuth } from '../interfaces/auth';
import axiosInstance from '../Utils/axios';
class AuthService {
	login(loginData: IAuth) {
		return axiosInstance
			.post('/login/login', {
				email: loginData.email,
				password: loginData.password,
				type: '',
			})
			.then((response) => {
				if (response.data.token) {
					localStorage.setItem('userToken', response.data.token);
				}

				return response.data.token;
			});
	}

	logout() {
		localStorage.removeItem('userToken');
	}
}

export default new AuthService();
