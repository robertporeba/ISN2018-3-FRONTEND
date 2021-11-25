import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import UserHeader from '../../components/headerUser/Header';
import Login from '../../pages/home/login/Login';
import Register from '../../pages/home/register/Register';


import './Home.scss';

function Home() {
	const [userForm, setLoginForm] = useState<boolean>(true);
	return (
		<div className="home-container">
			<UserHeader setUserForm={setLoginForm} />
			<div className="home-container__forms">{userForm ? <Login /> : <Register />}</div>
		</div>
	);
}

export default Home;