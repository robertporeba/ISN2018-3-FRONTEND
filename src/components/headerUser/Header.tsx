import React from 'react';

import './Header.scss';

interface IUserHeaderProps {
	setUserForm: Function;
}

export default function UserHeader(props: IUserHeaderProps) {
	const { setUserForm } = props;
	return (
		<div className="header-container">
			<button className="header-container__button" onClick={() => setUserForm(true)}>
				Twoje projekty
			</button>
			<button className="header-container__button" onClick={() => setUserForm(false)}>
				Tablica
			</button>
            <button className="header-container__button" onClick={() => setUserForm(false)}>
				Twoje zadania
			</button>
            <button className="header-container__button" onClick={() => setUserForm(false)}>
				Wyloguj
			</button>
		</div>
	);
}
