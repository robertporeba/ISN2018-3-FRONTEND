import React, { useCallback, useEffect, useState } from 'react';
import { history } from '../../../utils/history';
import { IAuth } from '../../../interfaces/auth';
import { login } from '../../../actions/auth';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useUserIdentity from '../../../hooks/use-user-identity';

import './edit-task.scss';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import { Link, useParams } from 'react-router-dom';
import taskService from '../../../services/task.service';
import { Button } from 'reactstrap';

interface IEditParam {
	id: string;
}

function EditTask() {
	const dispatch: any = useDispatch();
	const isAuth = useUserIdentity();
	const [panelForm, setPanelForm] = useState<boolean>(true);
	const [invalidData, setInvalidData] = useState(false);
	const [tasks, setTasks] = useState<any>();
	const { id } = useParams<IEditParam>();
	let taskId = parseInt(id);
	const getTask = useCallback(() => {
		taskService
			.gettask(taskId)
			.then((response) => {
				setTasks(response);
				console.log(response);
			
			})
			.catch((err) => {
				console.log(err);
			});
	}, [taskId]);

	useEffect(() => {
		getTask();
	}, [getTask]);


	return (

		<div className="admin-panel-container">
			{tasks && (
				<>
		<HeaderPanel setPanelForm={setPanelForm} />
		
		
		<div className="login-container">
		
			<h1 className="login-container__title">Edycja Taska</h1>
			<form className="login-container__form">
		
				<label className="login-container__form__email">Nazwa</label>
				<br />
				
				<input type="text" value={tasks.name} />
				<br />
				<label className="login-container__form__password">Osoba przypisana</label>
				<br />
				<input type="text" value={tasks.assignedUser} />
				<br />
				<label className="login-container__form__password">Priorytet</label>
				<br />
				<select value={tasks.priorityName}>
					<option value="LOW">LOW</option>
					<option value="MEDIUM">MEDIUM</option>
					<option value="HIGH">HIGH</option>
				</select>
				
				 	<br />
				
					 <input
					
					className="login-container__form__button"
					type="submit"
					value="Edytuj"
				/>
				
			
			</form>
			
		</div>
	</>
	)}

		</div>
		
	);
}

export default EditTask;


