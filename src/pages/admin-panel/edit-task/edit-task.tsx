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
	const [name, setName] = useState<any>();
	const [assignedUser, setAssignedUser] = useState<any>();
	const [priority, setPriority] = useState<any>();
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

	const updateTask = () => {
		taskService
			.updatetask({
				id: id,
				name: name,
				assignedUser: assignedUser,
				priorityId: priority,
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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

							<input
								type="text"
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
							<br />
							<label className="login-container__form__password">
								Osoba przypisana
							</label>
							<br />
							<input
								type="text"
								value={assignedUser}
								onChange={(e) => setAssignedUser(e.target.value)}
							/>
							<br />
							<label className="login-container__form__password">Priorytet</label>
							<br />
							<select value={priority} onChange={(e) => setPriority(e.target.value)}>
								<option value="1">LOW</option>
								<option value="2">MEDIUM</option>
								<option value="3">HIGH</option>
							</select>

							<br />

							<input
								onClick={() => updateTask()}
								className="login-container__form__button"
								type="button"
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
