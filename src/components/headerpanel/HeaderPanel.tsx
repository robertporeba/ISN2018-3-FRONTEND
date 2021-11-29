import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

import './HeaderPanel.scss';


interface IHeaderProps {
	setPanelForm: Function;
}


export default function HeaderPanel(props: IHeaderProps) {
	const { setPanelForm } = props;
	const dispatch = useDispatch();

	function logOut() {
		dispatch(logout());
	}
	return (
		
		<div className="header-container">
            <button className="header-container__button" onClick={() => setPanelForm(true)}>
				Dodaj Projekt
			</button>
			<button className="header-container__button" onClick={() => setPanelForm(true)}>
				Projekty
			</button>
			<button className="header-container__button" onClick={() => setPanelForm(true)}>
				Tablica
			</button>
			<button className="header-container__button1"><Link onClick={logOut} to={'/'} className="logout">
					Wyloguj się
				</Link></button>
         
            
		</div>
	);
}



