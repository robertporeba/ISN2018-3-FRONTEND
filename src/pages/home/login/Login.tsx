import React, { useEffect, useState } from 'react';
import { IAuth } from '../../../interfaces/auth';
import authService from '../../../services/auth.service';
import { useForm } from 'react-hook-form';

import './Login.scss';

function Login() {
	const [invalidData, setInvalidData] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data: any) => {
		authService
			.login({
				email: data.email,
				password: data.password,
				type: '',
			})
			.then((res) => {
				console.log(JSON.stringify(res));
			})
			.catch((e) => {
				setInvalidData(true);
			});
	};

	return (
		<div className="login-container">
			<h1 className="login-container__title">Login</h1>
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
				{errors.email && (
					<p className="login-container__form__error">Email jest wymagany</p>
				)}
				{errors.email && (
					<p className="login-container__form__error">Hasło jest wymagane</p>
				)}
				{invalidData && (
					<p className="login-container__form__error">Błędy login lub hasło</p>
				)}
				<br />
				<input
					onClick={() => setInvalidData(false)}
					className="login-container__form__button"
					type="submit"
					value="Zaloguj się"
				/>
			</form>
		</div>
	);
}

export default Login;
