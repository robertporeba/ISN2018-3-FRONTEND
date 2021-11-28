import React, { useState, useEffect } from 'react';
import { logout } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../../utils/history';
import useUserIdentity from '../../hooks/use-user-identity';

import './AdminPanel.scss';
import Header from '../../components/header/Header';

function AdminPanel() {
	const isAuth = useUserIdentity();
	const dispatch = useDispatch();

	function logOut() {
		dispatch(logout());
	}

	if (isAuth.userRoles === null) {
		history.push('/');
	}

	return (
		<div className="admin-panel-container">
			<Header setLoginForm={() => {}} />
			<div>
				<p>Uprawnienia: {isAuth.userRoles}</p>
				<Link onClick={logOut} to={'/'} className="">
					Wyloguj się
				</Link>
			</div>
		</div>
	);
}

export default AdminPanel;
