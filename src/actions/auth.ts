import { Dispatch } from 'redux';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	IAuthAction,
	IAuth,
} from '../interfaces/auth';
import AuthService from '../services/auth.service';

export const registerToSystem = (loginData: IAuth) => (dispatch: Dispatch<IAuthAction>) => {
	return AuthService.register(loginData).then(
		(response) => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: null,
			});
			return Promise.resolve();
		},
		(error) => {
			dispatch({
				type: REGISTER_FAIL,
				payload: null,
			});
			return Promise.reject();
		}
	);
};

export const login = (loginData: IAuth) => (dispatch: Dispatch<IAuthAction>) => {
	return AuthService.login(loginData).then(
		(userToken) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { userToken },
			});
			return Promise.resolve();
		},
		(error) => {
			dispatch({
				type: LOGIN_FAIL,
			});
			return Promise.reject();
		}
	);
};

export const logout = () => (dispatch: Dispatch<IAuthAction>) => {
	AuthService.logout();

	dispatch({
		type: LOGOUT,
	});
};
