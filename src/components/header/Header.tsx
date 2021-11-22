import React from 'react';

import './Header.scss';

interface IHeaderProps {
	setLoginForm: Function;
}

export default function Header(props: IHeaderProps) {
	const { setLoginForm } = props;
	return (
		<div className="header-container">
			<button className="header-container__button" onClick={() => setLoginForm(true)}>
				Logowanie
			</button>
			<button className="header-container__button" onClick={() => setLoginForm(false)}>
				Rejestracja
			</button>
		</div>
	);
}
