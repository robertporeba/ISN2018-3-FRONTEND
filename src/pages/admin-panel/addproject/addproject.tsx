import React, { useEffect, useState } from 'react';
import { history } from '../../../utils/history';
import { IAuth } from '../../../interfaces/auth';
import { login, logout } from '../../../actions/auth';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useUserIdentity from '../../../hooks/use-user-identity';

import './addproject.scss';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';

function Addproject() {
	const isAuth = useUserIdentity();
	const dispatch = useDispatch();

	function logOut() {
		dispatch(logout());
	}

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
			<form className="login-container__form" >
				<label className="login-container__form__email">Podaj nazwe Projektu</label>
				
				
		
			
				<br />
				<input type="text"  />
			
				<br />
				<input
					
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