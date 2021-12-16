import React, { useCallback, useEffect, useState } from 'react';
import './listprojects.scss';

import useUserIdentity from '../../../hooks/use-user-identity';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/auth';
import { history } from '../../../utils/history';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import { ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import projectService from '../../../services/project.service';
import { IGetProject, IProject } from '../../../interfaces/project';

function Listproject() {
	const isAuth = useUserIdentity();
	const dispatch = useDispatch();

	const [projects, setProjects] = useState<any>();
	const [projectName, setProjectName] = useState<string>('');
	const [goodData, setGoodData] = useState(false);
	const [goodDeleteData, setGoodDeleteData] = useState(false);
	const getAllProjects = useCallback(() => {
		projectService
			.getallprojects()
			.then((response) => {
				setProjects(response);
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		getAllProjects();
	}, [getAllProjects]);

	const addProject = () => {
		const projectModel: IProject = {
			name: projectName,
			author: isAuth.userName?.toString(),
		};
		projectService
			.addproject(projectModel)
			.then((res) => {
				getAllProjects();
				setGoodData(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (isAuth.userRoles === null) {
		history.push('/');
	}

	const [panelForm, setPanelForm] = useState<boolean>(true);

	return (
		<div className="admin-panel-container">
			<HeaderPanel setPanelForm={setPanelForm} />
			<h1>Twoje projekty</h1>
			<div className="admin-panel-container__forms">
				<ListGroup>
				{goodData && (
					 <div className="alert alert-primary" role="alert">
					Poprawnie dodałes projekt
				   </div>)}
				   {goodDeleteData && (
					 <div className="alert alert-primary" role="alert">
					Poprawnie usunięto projekt
				   </div>)}
					<ListGroupItem className="justify-content-between">
						
					{isAuth.userRoles === 'Admin' && (


						<div className={'add-wrapper'} style={{ margin: 50, display: "flex", justifyContent: "center"}}>
							<input
								className={'input'}
								placeholder="Wpisz nazwę projektu"
								type={'text'}
								onChange={(e) => setProjectName(e.target.value)}
							></input>
							<Button onClick={() => addProject()} className="btn btn-warming mr-1">
								Dodaj projekt
							</Button>
						</div>
					)}
					</ListGroupItem >
					{projects !== undefined &&
						projects.map((project: any) => (
							<ListGroupItem className="mt-2">
								<h2 className={'item-title'}>{project.name}</h2>
								<div className="ml-auto wrapper-buttons">
									{isAuth.userRoles === 'Admin' && (
										<Button color="danger">
											<Link
												className="btn btn-warming mr-1"
												to={'/editproject/' + project.id}
											>
												Edytuj
											</Link>
										</Button>
									)}
									<Button>
										<Link
											className="btn btn-warming mr-1"
											to={'/kanban/' + project.id}
										>
											Pokaż
										</Link>
									</Button>
									<Button
										onClick={() => {
											projectService.deleteproject(project.id).then(() => {
												getAllProjects();
												setGoodDeleteData(true);
											});
										}}
										color="danger"
									>
										<Link className="btn btn-warming mr-1" to="/listproject">
											Usuń
										</Link>
									</Button>
								</div>
							</ListGroupItem>
						))}
				</ListGroup>
				
			</div>

			<p>Uprawnienia: {isAuth.userRoles}</p>
		</div>
	);
}

export default Listproject;
