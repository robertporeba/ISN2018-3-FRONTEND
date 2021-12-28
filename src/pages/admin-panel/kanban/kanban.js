import React, { useState, useEffect } from 'react';
import { DragDropContext, DropTarget, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import useUserIdentity from '../../../hooks/use-user-identity';
import update from 'immutability-helper';
import { Link, useParams } from 'react-router-dom';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import './kanban.scss';
import taskService from '../../../services/task.service';
import { Dropdown } from 'reactstrap';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import columnService from '../../../services/column.service';

const classes = {
	board: {
		display: 'flex',
		justifyContent: 'center',
		margin: '0 auto',
		height: 'auto',
		width: '90vw',
		fontFamily: 'Arial, "Helvetica Neue", sans-serif',
	},
	column: {
		minWidth: 300,
		width: '18vw',
		height: '100%',
		margin: '5px',
		backgroundColor: '#cfe0f8',
		border: '2px solid #1d2245',
	},
	columnHead: {
		textAlign: 'center',
		padding: 10,
		fontSize: '1.2em',
		backgroundColor: '#27c647',
		color: 'white',
		fontWeight: '600',
	},
	item: {
		padding: 10,
		margin: 10,
		borderRadius: '10px',
		fontSize: '0.8em',
		fontWeight: '700',
		cursor: 'pointer',
		backgroundColor: 'white',
		height: 'auto',
	},
};

function Kanban() {
	let [labels, setLabels] = useState([]);
	let [labelsMap, setLabelsMap] = useState();

	const [showDropdown, setShowDropdown] = useState(false);

	const [tasks, setTasks] = useState([]);
	const [singleTask, setSingleTask] = useState({});
	const [taskName, setTaskName] = useState('');
	const [forceReload, setForceReload] = useState(1);
	const [panelForm, setPanelForm] = useState(true);
	const isAuth = useUserIdentity();
	const { id } = useParams();
	let projectId = parseInt(id);

	useEffect(() => {
		columnService.getallcolumns(projectId).then((res) => {
			labels = [];
			labelsMap = {};
			let columns = {};
			res.map((column) => {
				labels.push(column.id);
				let obj = {};
				obj[column.id] = column.name;
				Object.assign(columns, obj);
			});
			setLabelsMap(columns);
			setLabels(labels);
		});
		taskService.getalltasks(projectId).then((res) => {
			setTasks(res);
		});
	}, [forceReload, labels, projectId]);

	const updateTask = (id, statusId) => {
		taskService
			.changestatus({
				id: id,
				statusId: statusId,
				projectId: projectId,
			})
			.then((res) => {
				const task = tasks.find((task) => task.id === id);
				task.statusId = statusId;
				const taskIndex = tasks.indexOf(task);
				const newTasks = update(tasks, {
					[taskIndex]: { $set: task },
				});
				console.log(res, newTasks);
				setTasks(newTasks);
				setForceReload(!forceReload);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const add = () => {
		taskService
			.addtask({
				name: taskName,
				author: isAuth.userName,
				assignedUser: isAuth.userName,
				statusId: labels[0],
				priorityId: 1,
				projectId: projectId,
			})
			.then((res) => {
				const taskToAdd = { id: res.id, name: taskName, statusId: labels[0] };
				const task = tasks.push(taskToAdd);
				const taskIndex = tasks.indexOf(task);
				const newTasks = update(tasks, {
					[taskIndex]: { $set: task },
				});

				console.log('newTask', newTasks);
				setForceReload(!forceReload);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		console.log('reload');
	}, [forceReload]);

	return (
		<main>
			<HeaderPanel setPanelForm={setPanelForm} />
			{labels.length > 0 ? (
				<div style={{ margin: 50, display: 'flex', justifyContent: 'center' }}>
					<input
						type="text"
						placeholder="Wpisz nazwę task"
						className="input"
						onChange={(e) => setTaskName(e.target.value)}
					/>
					<button className="submit" onClick={() => add()}>
						Dodaj task
					</button>
				</div>
			) : (
				<div style={{ margin: 50, display: 'flex', justifyContent: 'center' }}>
					brak kolumn
				</div>
			)}

			<section style={classes.board}>
				{labels.map((channel) => (
					<KanbanColumn status={channel}>
						<div style={classes.column}>
							<div style={classes.columnHead}>{labelsMap[channel]}</div>
							<div>
								{tasks
									.filter((item) => item.statusId === channel)
									.map((item) => (
										<KanbanItem id={item.id} onDrop={updateTask}>
											<div style={classes.item}>
												<Link
													className="goToEdit"
													to={'/editask/' + item.id}
												>
													<div className="taskTitle">
														<h3 class="task_title">
															Nazwa: {item.name}
														</h3>
													</div>
												</Link>
												<div className="task_body">
													<div className="task_bodydesc">
														<h3>Autor: {item.author}</h3>
														<h3>Przypisana: {item.assignedUser}</h3>
														<h3>
															Data:{' '}
															{format(
																new Date(item.createDate),
																'dd MMMM yyyy',
																{ locale: pl }
															)}
														</h3>
														<h3>Priorytet: {item.priorityName}</h3>
													</div>
													<div
														className="card_top_more"
														onClick={(event) => {
															event.stopPropagation(item.id);
															setShowDropdown(true);
														}}
													>
														<MoreHorizontal className="click" />
														{showDropdown && (
															<Dropdown
																class="board_dropdown"
																onClose={() =>
																	setShowDropdown(false)
																}
															>
																<Button
																	onClick={() => {
																		taskService
																			.deletetask(item.id)
																			.then(() => {
																				taskService
																					.getalltasks(
																						projectId
																					)
																					.then((res) => {
																						setForceReload(
																							!forceReload
																						);
																					});
																			});
																	}}
																	color="danger"
																>
																	<Link
																		className="btn_usun"
																		to={'/kanban/' + projectId}
																	>
																		Usuń task
																	</Link>
																</Button>
															</Dropdown>
														)}
													</div>
												</div>
											</div>
										</KanbanItem>
									))}
							</div>
						</div>
					</KanbanColumn>
				))}
			</section>
			<p style={{ margin: 10, display: 'flex', justifyContent: 'center' }}>
				Uprawnienia: {isAuth.userRoles}
			</p>
		</main>
	);
}

export default DragDropContext(HTML5Backend)(Kanban);

const boxTarget = {
	drop(props) {
		return { name: props.status };
	},
};

class KanbanColumn extends React.Component {
	render() {
		return this.props.connectDropTarget(<div className="columns">{this.props.children}</div>);
	}
}

KanbanColumn = DropTarget('kanbanItem', boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(KanbanColumn);

const boxSource = {
	beginDrag(props) {
		return {
			name: props.id,
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
			props.onDrop(monitor.getItem().name, dropResult.name);
		}
	},
};

class KanbanItem extends React.Component {
	render() {
		return this.props.connectDragSource(<div className="task">{this.props.children}</div>);
	}
}

KanbanItem = DragSource('kanbanItem', boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(KanbanItem);
