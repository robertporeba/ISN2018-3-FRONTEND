import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { UserRoleType } from '../interfaces/auth';

export default function useUserRoleChecker(role: UserRoleType | UserRoleType[]): boolean {
	const userToken = useSelector((state: any) => state.auth.userToken);
	const decoded: any = useMemo(() => (userToken ? jwt_decode(userToken) : null), [userToken]);
	if (!decoded) {
		return false;
	}

	const currentRoles: string | string[] =
		decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
	if (!currentRoles) {
		return false;
	}

	if (Array.isArray(role)) {
		if (Array.isArray(currentRoles)) {
			const matchedRoles = role.filter((x) => currentRoles.filter((y) => y === x).length > 0);
			return matchedRoles.length !== 0;
		}

		const matchedRoles = role.filter((x) => x === currentRoles);
		return matchedRoles.length !== 0;
	}

	return currentRoles === role || currentRoles.indexOf(role) !== -1;
}
