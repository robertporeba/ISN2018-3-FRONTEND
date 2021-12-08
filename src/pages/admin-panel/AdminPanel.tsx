import React, { useState, useEffect } from 'react';
import { logout } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../../utils/history';
import useUserIdentity from '../../hooks/use-user-identity';

import './AdminPanel.scss';

import HeaderPanel from '../../components/headerpanel/HeaderPanel';
import Login from '../home/login/Login';
import Register from '../home/register/Register';
import Addproject from './addproject/addproject';
import Home from '../home/Home';
import HomePanel from './home/Home';

function AdminPanel() {
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
				{panelForm ? <HomePanel /> : <Register />}
			</div>

			<p>Uprawnienia: {isAuth.userRoles}</p>
		</div>
	);
}

export default AdminPanel;
