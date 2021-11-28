export interface IAuth {
	email: string;
	password: string;
	type: string | null;
}

export type AuthActionType =
	| 'REGISTER_SUCCESS'
	| 'REGISTER_FAIL'
	| 'LOGIN_SUCCESS'
	| 'LOGIN_FAIL'
	| 'LOGOUT';

export const REGISTER_SUCCESS: AuthActionType = 'REGISTER_SUCCESS';
export const REGISTER_FAIL: AuthActionType = 'REGISTER_FAIL';
export const LOGIN_SUCCESS: AuthActionType = 'LOGIN_SUCCESS';
export const LOGIN_FAIL: AuthActionType = 'LOGIN_FAIL';
export const LOGOUT: AuthActionType = 'LOGOUT';

export interface IAuthPayload {
	userToken: String | null;
	isLoggedIn?: Boolean;
}

export interface IAuthAction {
	payload?: IAuthPayload | null;
	type: AuthActionType;
}

export interface IAuthState {
	userToken: String | null;
	isLoggedIn: Boolean;
}

export type UserRoleType = 'User' | 'Admin';
export const User: UserRoleType = 'User';
export const Admin: UserRoleType = 'Admin';
