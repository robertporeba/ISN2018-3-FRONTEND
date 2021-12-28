import React, { useCallback, useEffect, useState } from 'react';
import { history } from '../../../utils/history';
import useUserIdentity from '../../../hooks/use-user-identity';
import { useParams } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

import './edit-project.scss';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import userProjectService from '../../../services/user-projects.service';
import columnService from '../../../services/column.service';
import { IUserProjects } from '../../../interfaces/project';
import { IColumn } from '../../../interfaces/column';

interface IEditParam {
	id: string;
}

function EditProject() {
	const isAuth = useUserIdentity();
	const [users, setUsers] = useState<any>();
	const [columns, setColumns] = useState<any>();
	const [userName, setUserName] = useState<any>();
	const [goodData, setGoodData] = useState(false);
	const [columnName, setColumnName] = useState<any>();
	const [goodColumnData, setGoodColumnData] = useState(false);

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

	const addColumn = () => {
		const columnModel: IColumn = {
			name: columnName,
			projectId: idNumber,
		};
		columnService
			.addcolumn(columnModel)
			.then((res) => {
				getAllColumns();
				setGoodColumnData(true);
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

	const getAllColumns = useCallback(() => {
		columnService
			.getallcolumns(idNumber)
			.then((response) => {
				setColumns(response);
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [idNumber]);

	useEffect(() => {
		getAllColumns();
		getAllUserProjects();
	}, [getAllUserProjects, getAllColumns]);

	const deleteUser = (name: string, projectId: number) => {
		const projectModel: IUserProjects = {
			userName: name,
			projectId: projectId,
		};
		userProjectService.deleteproject(projectModel).then(() => {
			getAllUserProjects();
		});
	};

	const deleteColumn = (id: number) => {
		columnService.deletecolumn(id).then(() => {
			getAllColumns();
		});
	};

	return (
		<div className="admin-panel-container">
			<HeaderPanel setPanelForm={setPanelForm} />
			<div className="admin-panel-container__forms">
				<div>
					{goodColumnData && (
						<div className="alert alert-primary" role="alert">
							Poprawnie dodałeś kolumnę
						</div>
					)}
					<div
						className={'add-wrapper'}
						style={{ margin: 50, display: 'flex', justifyContent: 'center' }}
					>
						<input
							className={'input'}
							placeholder="Nazwa kolumny"
							type={'text'}
							onChange={(e) => setColumnName(e.target.value)}
						></input>
						<Button onClick={() => addColumn()} className="btn btn-warming mr-1">
							Dodaj kolumnę
						</Button>
					</div>
					<ListGroup>
						{columns !== undefined &&
							columns.map((column: any) => (
								<ListGroupItem
									className="mt-2"
									style={{
										margin: 10,
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<div>{column.name}</div>
									<Button
										onClick={() => deleteColumn(column.id)}
										className="btn btn-warming mr-1"
									>
										Usuń
									</Button>
								</ListGroupItem>
							))}
					</ListGroup>
				</div>
				<div>
					{goodData && (
						<div className="alert alert-primary" role="alert">
							Poprawnie dodałes dostęp
						</div>
					)}
					<div
						className={'add-wrapper'}
						style={{ margin: 50, display: 'flex', justifyContent: 'center' }}
					>
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
								<ListGroupItem
									className="mt-2"
									style={{
										margin: 10,
										display: 'flex',
										justifyContent: 'center',
									}}
								>
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
