import React, { useEffect, useState } from 'react';
import { IAuth } from '../../../interfaces/auth';
import { useForm } from 'react-hook-form';
import { history } from '../../../utils/history';
import { useDispatch } from 'react-redux';
import useUserIdentity from '../../../hooks/use-user-identity';
import { registerToSystem } from '../../../actions/auth';

import './Register.scss';

function Register() {
	const dispatch: any = useDispatch();
	const isAuth = useUserIdentity();
	const [invalidData, setInvalidData] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data: any) => {
		const registerModel: IAuth = {
			email: data.email,
			password: data.password,
			type: data.type,
		};
		dispatch(registerToSystem(registerModel))
			.then(() => {
				console.log('success');
			})
			.catch(() => {
				setInvalidData(false);
			});
	};

	if (isAuth.userRoles !== null) {
		history.push('/admin-panel');
	}

	return (
		<div className="register-container">
			<h1 className="login-container__title">Rejestracja</h1>
			<form className="login-container__form" onSubmit={handleSubmit(onSubmit)}>
				<label className="login-container__form__email">E-mail</label>
				<br />
				<input
					{...register('email', {
						required: true,
						pattern:
							/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					})}
				/>
				<br />
				<label className="login-container__form__password">Hasło</label>
				<br />
				<input type="password" {...register('password', { required: true })} />
				<br />
				<br />
				<select {...register('type')}>
					<option value="User">User</option>
					<option value="Admin">Admin</option>
				</select>
				{errors.email && (
					<p className="login-container__form__error">Email jest wymagany</p>
				)}
				{errors.email && (
					<p className="login-container__form__error">Hasło jest wymagane</p>
				)}
				{invalidData && (
					<p className="login-container__form__error">
						Użytkownik o takim adresie już istnieje
					</p>
				)}
				<br />
				<input
					onClick={() => setInvalidData(false)}
					className="login-container__form__button"
					type="submit"
					value="Zarejestruj"
				/>
			</form>
		</div>
	);
}

export default Register;
