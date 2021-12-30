import React, { useCallback, useEffect, useState } from 'react';
import { history } from '../../../utils/history';
import { IAuth } from '../../../interfaces/auth';
import { login } from '../../../actions/auth';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useUserIdentity from '../../../hooks/use-user-identity';
import ReactAudioPlayer from 'react-audio-player';
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
	const [description, setDescription] = useState<any>();
	const [name, setName] = useState<any>();
	const [assignedUser, setAssignedUser] = useState<any>();
	const [file, setFile] = useState<string>();
	const [priority, setPriority] = useState<any>(1);
	const { id } = useParams<IEditParam>();
	let taskId = parseInt(id);
	const getTask = useCallback(() => {
		taskService
			.gettask(taskId)
			.then((response) => {
				setTasks(response);
				setDescription(response.description);
				setName(response.name);
				setAssignedUser(response.assignedUser);
				setPriority(response.priorityId);
				setFile(response.filename);
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
				description: description,
				assignedUser: assignedUser,
				priorityId: priority,
				fileName: file,
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	};

const changeHandler = (event:any) => {
	
	const reader=new FileReader();
	reader.onloadend=()=>{
		 setFile(reader.result as string);
	};
	reader.readAsDataURL(event.target.files[0]);
		
	
};

const dowland=() =>{
const url=window.URL.createObjectURL(new Blob([tasks.fileName]));
const link=document.createElement('a');
link.href=url;
link.setAttribute("dowland",'file.wav');
document.body.appendChild(link);
link.click();

}

console.log(file);


	return (
		<div className="admin-panel-container">
			{tasks && (
				<>
					<HeaderPanel setPanelForm={setPanelForm} />
				
					<div className="login-container" style={{ margin: 10, display: "flex", justifyContent: "center"}}>
						<h1 className="login-container__title">Edycja Taska</h1>
						<form className="login-container__form" encType="multipart/form-data" >
							<label className="login-container__form__email">Nazwa</label>
							<br />

							<input
								className='input'
								type="text"
								defaultValue={tasks.name}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<br />
							<label className="login-container__form__email">Opis</label>
							<br />
							<textarea 	defaultValue={tasks.description} className='input'
								value={description}
								onChange={(e) => setDescription(e.target.value)} />
							<br />
							<label className="login-container__form__password">
								Osoba przypisana
							</label>
							<br />
							<input
								type="text"
								className='input'
								defaultValue={tasks.assignedUser}
								value={assignedUser}
								onChange={(e) => setAssignedUser(e.target.value)}
							/>
							<br />
							<label className="login-container__form__password">Priorytet</label>
							<br />
							<select
								defaultValue={tasks.priorityId}
								value={priority}
								onChange={(e) => setPriority(e.target.value)}
							>
								<option value="1">LOW</option>
								<option value="2">MEDIUM</option>
								<option value="3">HIGH</option>
							</select>
							<br/>
							<label className="login-container__form__password">
								Wczytaj plik
							</label>
							<br/>
							<input
								type="file"
								className='inputfile'
								
								
								onChange={(e)=>changeHandler(e)}
							/>
							<br />
							<br />
							
							<ReactAudioPlayer
  src={tasks.fileName}
  
  controls
/>
							
				
							<Button
								onClick={() => updateTask()}
								className="login-container__form__button"
								style={{ marginLeft: 10, width:200}}
								
							>
								<Link
									className="btn1" 
									to={'/kanban/' + tasks.projectId}
									style={{ margin: 10}}
								>
									Edytuj task
								</Link>
							</Button>
						</form>
					</div>
				</>
			)}
			<p>Uprawnienia: {isAuth.userRoles}</p>
		</div>
	);
}

export default EditTask;
