import React, { useEffect, useState } from 'react';
import { history } from '../../../utils/history';
import { IAuth } from '../../../interfaces/auth';
import { login, logout } from '../../../actions/auth';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useUserIdentity from '../../../hooks/use-user-identity';

import './addproject.scss';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import { Link } from 'react-router-dom';
import { IProject } from '../../../interfaces/project';
import projectService from '../../../services/project.service';

function Addproject() {
	const isAuth = useUserIdentity();
	const dispatch = useDispatch();

	const [invalidData, setInvalidData] = useState(false);
	const [successData, setSuccessData] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data: any) => {
		const projectModel: IProject = {
			name: data.name,
			author: isAuth.userName?.toString(),
		};
		projectService
			.addproject(projectModel)
			.then((res) => {
				setSuccessData(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (isAuth.userRoles === null) {
		history.push('/');
	}
	const [panelForm, setPanelForm] = useState<boolean>(true);

	return (
		<div className="admin-panel-container">
			<HeaderPanel setPanelForm={setPanelForm} />
			<div className="admin-panel-container__forms">
				<div className="login-container">
					<h1 className="login-container__title">Projekt</h1>
					<form className="login-container__form" onSubmit={handleSubmit(onSubmit)}>
						<label className="login-container__form__email">Podaj nazwe Projektu</label>

						<br />
						<input type="text" {...register('name', { required: true })} />
						<br />
						{successData && (
							<p className="project-container__form__success">
								Poprawnie dodałeś projekt
							</p>
						)}

						<input
							onClick={() => setInvalidData(false)}
							className="login-container__form__button"
							type="submit"
							value="Stwórz"
						/>
					</form>
				</div>
			</div>

			<p>Uprawnienia: {isAuth.userRoles}</p>
		</div>
	);
}

export default Addproject;
