import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useUserIdentity from '../hooks/use-user-identity';
import useUserRoleChecker from '../hooks/use-user-role-checker';
import { history } from './history';

export function extractErrorMessage(error: any) {
	if (!error || !error.response) {
		return 'Error';
	}

	if (error.response.status === 500) {
		return '500';
	}
	if (error.response.status === 401 || error.response.status === 403) {
		return '401 | 403';
	}
	if (error.response.status === 404) {
		return '404';
	}

	const message = (error.response && error.response.data) || error.message || error.toString();
	return message;
}

export function PrivateRoute({ children, ...rest }: any) {
	let auth = useUserIdentity();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.userName ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}

export function RoleRoute({ children, role, ...rest }: any) {
	let hasRole = useUserRoleChecker(role);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				hasRole ? (
					children
				) : (
					<>
						<Redirect
							to={{
								pathname: '/',
								state: { from: location },
							}}
						/>
					</>
				)
			}
		/>
	);
}

export function ClientErrorRouting(error: any) {
	if (error.response.status === 404) {
		return history.push('/');
	} else if (error.response.status === 500) {
		return history.push('/');
	}

	return history.push('/');
}
