import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

interface IUserIdentity {
	userName: string | null;
	userRoles: string | string[] | null;
}

export default function useUserIdentity(): IUserIdentity {
	const userToken = useSelector((state: any) => state.auth.userToken);
	const decoded: any = useMemo(() => (userToken ? jwt_decode(userToken) : null), [userToken]);

	if (!userToken) {
		return { userName: null, userRoles: null };
	}

	const userName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
	const userRoles = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

	return { userName, userRoles };
}
