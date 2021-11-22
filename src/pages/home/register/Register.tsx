import React, { useEffect, useState } from 'react';
import { IAuth } from '../../../interfaces/auth';
import authService from '../../../services/auth.service';
import userService from '../../../services/user.service';

import './Register.scss';

function Register() {
	const [loginData, setLoginData] = useState<IAuth>({
		email: 'test@test.test',
		password: '!QAZ2wsx',
		type: null,
	});

	useEffect(() => {
		console.log('click');
		authService.login(loginData).then((res) => {
			console.log(JSON.stringify(res));
		});
	}, [loginData]);

	// useEffect(() => {
	// 	console.log('click');
	// 	userService.getUserInfo().then((res) => {
	// 		console.log(JSON.stringify(res));
	// 	});
	// }, [loginData]);

	return (
		<div className="register-container">
			<p>Ekran rejestracji</p>
		</div>
	);
}

export default Register;
