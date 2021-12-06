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
            <Link className="header-container__button" to="/addproject" onClick={() => setPanelForm(true)}>
				Dodaj Projekt
			</Link>
			<Link className="header-container__button" to="/listproject" onClick={() => setPanelForm(true)}>
				Projekty
			</Link>
			<Link className="header-container__button" to="/board" onClick={() => setPanelForm(true)}>
				Tablica
			</Link>
			<Link className="header-container__button" to="/boardv2" onClick={() => setPanelForm(true)}>
				Tablicav2
			</Link>
			<button className="header-container__button1"><Link onClick={logOut} to={'/'} className="logout">
					Wyloguj się
				</Link></button>
         
            
		</div>
	);
}