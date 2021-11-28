import { IAuth } from '../interfaces/auth';
import axiosInstance from '../utils/axios';
class AuthService {
	register(registerData: IAuth) {
		return axiosInstance
			.post('/register/register', {
				email: registerData.email,
				password: registerData.password,
				type: registerData.type,
			})
			.then((response) => {
				return response.data;
			});
	}

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
