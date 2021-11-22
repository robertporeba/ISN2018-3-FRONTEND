import axios from 'axios';
import { SERVER_URL } from '../constants/server';

let baseURL = SERVER_URL;
let instance = axios.create();
instance.defaults.baseURL = baseURL + 'api/';

instance.interceptors.request.use((request) => {
	const userToken = localStorage.getItem('userToken');
	if (userToken) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken;
	}

	return request;
});

export default instance;
