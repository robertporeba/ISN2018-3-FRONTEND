import React, { useState, useEffect } from 'react';
import { logout } from '../../../actions/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../../../utils/history';
import useUserIdentity from '../../../hooks/use-user-identity';

import './Home.scss';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';




function HomePanel() {
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
		
		
			
			<div className="admin-panel-container__forms">

                <h1>Witaj w KanbanMusic</h1>
                <img src={"board.png"}></img>
            </div>
			
		
		
	
		
	);
}

export default HomePanel;