import { IAuth } from '../interfaces/auth';
import axiosInstance from '../Utils/axios';
class RegisterService {
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

	
}

export default new RegisterService();
