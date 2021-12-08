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
					<div className={'add-wrapper'}>
						<input
							className={'add-input'}
							type={'text'}
							onChange={(e) => setUserName(e.target.value)}
						></input>
						<Button onClick={() => addProject()} className="btn btn-warming mr-1">
							Nadaj dostęp
						</Button>
					</div>
					{users !== undefined &&
						users.map((user: any) => (
							<div className={'content'}>
								<div>{user.userName}</div>
								<Button
									onClick={() => deleteUser(user.userName, user.projectId)}
									className="btn btn-warming mr-1"
								>
									Usuń
								</Button>
							</div>
						))}
				</div>
			</div>
			<p>Uprawnienia: {isAuth.userRoles}</p>
		</div>
	);
}

export default EditProject;
