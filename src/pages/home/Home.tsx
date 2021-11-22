import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Login from './login/Login';
import Register from './register/Register';

import './Home.scss';

function Home() {
	const [loginForm, setLoginForm] = useState<boolean>(true);
	return (
		<div className="home-container">
			<Header setLoginForm={setLoginForm} />
			<div className="home-container__forms">{loginForm ? <Login /> : <Register />}</div>
		</div>
	);
}

export default Home;
