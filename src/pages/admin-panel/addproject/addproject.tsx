import React, { useEffect, useState } from 'react';
import { history } from '../../../utils/history';
import { IAuth } from '../../../interfaces/auth';
import { login } from '../../../actions/auth';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useUserIdentity from '../../../hooks/use-user-identity';

import './addproject.scss';

function Addproject() {
	

	return (
		<div className="project-container">
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
	);
}

export default Addproject;
