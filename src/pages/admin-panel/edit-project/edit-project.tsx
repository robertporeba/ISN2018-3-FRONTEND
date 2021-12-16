import React, { useCallback, useEffect, useState } from 'react';
import { history } from '../../../utils/history';
import useUserIdentity from '../../../hooks/use-user-identity';
import { useParams } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

import './edit-project.scss';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import userProjectService from '../../../services/user-projects.service';
import { IUserProjects } from '../../../interfaces/project';

interface IEditParam {
	id: string;
}

function EditProject() {
	const isAuth = useUserIdentity();
	const [users, setUsers] = useState<any>();
	const [userName, setUserName] = useState<any>();
	const [goodData, setGoodData] = useState(false);
	const { id } = useParams<IEditParam>();
	let idNumber = parseInt(id);

	if (isAuth.userRoles === null) {
		history.push('/');
	}
	const [panelForm, setPanelForm] = useState<boolean>(true);

	const addProject = () => {
		const userProjectModel: IUserProjects = {
			userName: userName,
			projectId: idNumber,
		};
		userProjectService
			.adduserproject(userProjectModel)
			.then((res) => {
				getAllUserProjects();
				setGoodData(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getAllUserProjects = useCallback(() => {
		userProjectService
			.getalluserprojects(idNumber)
			.then((response) => {
				setUsers(response);
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [idNumber]);

	useEffect(() => {
		getAllUserProjects();
	}, [getAllUserProjects]);

	const deleteUser = (name: string, projectId: number) => {
		const projectModel: IUserProjects = {
			userName: name,
			projectId: projectId,
		};
		userProjectService.deleteproject(projectModel).then(() => {
			getAllUserProjects();
		});
	};

	return (
		<div className="admin-panel-container">
			<HeaderPanel setPanelForm={setPanelForm} />
			<div className="admin-panel-container__forms">
				<div>
				{goodData && (
					 <div className="alert alert-primary" role="alert">
					Poprawnie dodałes dostęp
				   </div>)}
					<div className={'add-wrapper'} style={{ margin: 50, display: "flex", justifyContent: "center"}}>
						
						<input
							className={'input'}
							placeholder="Wpisz osobę"
							type={'text'}
							onChange={(e) => setUserName(e.target.value)}
						></input>
						<Button onClick={() => addProject()} className="btn btn-warming mr-1">
							Nadaj dostęp
						</Button>
					</div>
					<ListGroup>
					
					{users !== undefined &&
						users.map((user: any) => (
							<ListGroupItem className="mt-2" style={{ margin: 10, display: "flex", justifyContent: "center"}}>
							
								<div>{user.userName}</div>
								<Button
									onClick={() => deleteUser(user.userName, user.projectId)}
									className="btn btn-warming mr-1"
								>
									Usuń
								</Button>
							
							</ListGroupItem>
						))}
						</ListGroup>
				</div>
			</div>
			<p>Uprawnienia: {isAuth.userRoles}</p>
		</div>
	);
}

export default EditProject;
