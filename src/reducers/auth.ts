import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	IAuthState,
	IAuthAction,
} from '../interfaces/auth';

const userToken = localStorage.getItem('userToken');

const initialState: IAuthState = userToken
	? { isLoggedIn: true, userToken }
	: { isLoggedIn: false, userToken: null };

export default function auth(state: IAuthState = initialState, action: IAuthAction) {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				isLoggedIn: false,
			};
		case REGISTER_FAIL:
			return {
				...state,
				isLoggedIn: false,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				userToken: payload ? payload.userToken : null,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				userToken: null,
			};
		case LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				userToken: null,
			};
		default:
			return state;
	}
}
