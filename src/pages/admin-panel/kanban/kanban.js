import React, { useState, useEffect } from 'react';
import { DragDropContext, DropTarget, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import useUserIdentity from '../../../hooks/use-user-identity';
import update from 'immutability-helper';
import { Link, useParams } from 'react-router-dom';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import './kanban.scss';
import taskService from '../../../services/task.service';
import { Dropdown } from 'reactstrap';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
const labels = [1, 2, 3];
const labelsMap = {
	1: 'To Do',
	2: 'In Progress',
	3: 'Done',
};

const classes = {
	board: {
		display: 'flex',
		margin: '0 auto',
		marginLeft:'300px',
		height:'auto',
		width: '900px',
		fontFamily: 'Arial, "Helvetica Neue", sans-serif',
	},
	column: {
		minWidth: 300,
		width: '18vw',
		height: '800px',
		margin: '0 auto',
		backgroundColor: '#cfe0f8',
		border: '2px solid #1d2245',
	},
	columnHead: {
		textAlign: 'center',
		padding: 10,
		fontSize: '1.2em',
		backgroundColor: '#27c647',
		color: 'white',
		fontWeight:'600',

	},
	item: {
		padding: 10,
		margin: 10,
		borderRadius:'10px',
		fontSize: '0.8em',
		fontWeight:'700',
		cursor: 'pointer',
		backgroundColor: 'white',
		height:'80px',
	},
};

function Kanban() {

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
		taskService.getalltasks(projectId).then((res) => {
			setTasks(res);
			setForceReload(!forceReload);
			
		});
	}, []);
	console.log(tasks);
	const updateTask = (id, statusId) => {
		const task = tasks.find((task) => task.id === id);
		task.statusId = statusId;
		const taskIndex = tasks.indexOf(task);
		const newTasks = update(tasks, {
			[taskIndex]: { $set: task },
		});
		console.log('reload', newTasks);
		setTasks(newTasks);
		setForceReload(!forceReload);
	};

	const add = () => {
		taskService
			.addtask({
				name: taskName,
				author: isAuth.userName,
				assignedUser: isAuth.userName,
				statusId: 1,
				priorityId: 2,
				projectId: projectId,
			})
			.then((res) => {
				console.log(res);
				const taskToAdd = { id: res.id, name: taskName, statusId: '1' };
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
			
			<section style={classes.board}>
			<div className="task_add">
								<h3>Dodaj taska</h3>	
								<input type="text" onChange={(e) => setTaskName(e.target.value)} />
								<button onClick={() => add()}>Dodaj task</button>
								</div>
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
												<div className="taskTitle">
												<h3 class="task_title">Nazwa: {item.name}</h3>
												
												</div>
												
												<div className='task_body'>
									
		  <div className='task_bodydesc'>
												<h3>Autor: {item.author}</h3>
												<h3>Przypisana: {item.assignedUser}</h3>
												<h3>Data: {item.createDate}</h3>
												<h3>Priorytet: {item.priorityId}</h3>
												</div>
												<div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                	<Button
										onClick={() => {
											taskService.deletetask(item.id).then(() => {
												taskService.getalltasks(projectId);
											});
										}}
										color="danger"
									>
									<Link className="btn btn-warming mr-1" to={'/kanban/' + projectId}>
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
		return this.props.connectDropTarget(<div>{this.props.children}</div>);
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
		return this.props.connectDragSource(<div>{this.props.children}</div>);
	}
}

KanbanItem = DragSource('kanbanItem', boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(KanbanItem);
