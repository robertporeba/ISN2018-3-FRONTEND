import React, { useState, useEffect } from 'react';
import { DragDropContext, DropTarget, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import useUserIdentity from '../../../hooks/use-user-identity';
import update from 'immutability-helper';
import { useParams } from 'react-router-dom';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';

import './kanban.scss';
import taskService from '../../../services/task.service';

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
		width: '90vw',
		fontFamily: 'Arial, "Helvetica Neue", sans-serif',
	},
	column: {
		minWidth: 200,
		width: '18vw',
		height: '80vh',
		margin: '0 auto',
		backgroundColor: '#566573',
	},
	columnHead: {
		textAlign: 'center',
		padding: 10,
		fontSize: '1.2em',
		backgroundColor: '#7F8C8D',
		color: 'white',
	},
	item: {
		padding: 10,
		margin: 10,
		fontSize: '0.8em',
		cursor: 'pointer',
		backgroundColor: 'white',
	},
};

function Kanban() {
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
			<input type="text" onChange={(e) => setTaskName(e.target.value)} />
			<button onClick={() => add()}>Dodaj task</button>
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
											<div style={classes.item}>{item.name}</div>
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
