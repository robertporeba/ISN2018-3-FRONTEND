import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './Board.scss';
import DragEnd from './components/DragEnd';
import Input from './components/Input';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import { useDispatch } from 'react-redux';
import useUserIdentity from '../../../hooks/use-user-identity';
import { logout } from '../../../actions/auth';
import { history } from '../../../utils/history';
export interface ITodo {
	content: string;
}

export class Todo {
	id: any;
	content: string;

	constructor(content: string = '') {
		this.id = uuid();
		this.content = content;
	}
}

const backendItems: Todo[] = [new Todo('Zadanie 1'), new Todo('Zadanie 2')];
const backendColumns = {
	[uuid()]: {
		name: 'Do zrobienia',
		items: backendItems,
	},
	[uuid()]: {
		name: 'W trakcie',
		items: [],
	},
	[uuid()]: {
		name: 'Zrobione',
		items: [],
	},
};

function Board() {
	const [columns, setColumns] = useState(backendColumns);

	const [todos, setTodos] = useState(backendItems);
	function addTodo(todo: Todo) {
		setTodos([todo, ...todos]);
	}

	const isAuth = useUserIdentity();
	const dispatch = useDispatch();

	function logOut() {
		dispatch(logout());
	}

	if (isAuth.userRoles === null) {
		history.push('/');
	}

	const [panelForm, setPanelForm] = useState<boolean>(true);
	return (
		<div className="admin-panel-container">
			<HeaderPanel setPanelForm={setPanelForm} />
			<div>
				<div className="heading">KanbanMusic</div>
				<div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<h2>{'Nowe zadanie'}</h2>
						<Input addTodo={addTodo} />
					</div>
					<DragDropContext onDragEnd={(result) => DragEnd(result, columns, setColumns)}>
						{Object.entries(columns).map(([columnId, column]) => {
							return (
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}
									key={columnId}
								>
									<h2>{column.name}</h2>
									<div style={{ marginLeft: 30, marginRight: 30 }}>
										<Droppable droppableId={columnId} key={columnId}>
											{(provided, snapshot) => {
												return (
													<div
														{...provided.droppableProps}
														ref={provided.innerRef}
														style={{
															background: snapshot.isDraggingOver
																? '#808080'
																: '#d3d3d3',
															padding: 1,
															width: 300,
															minHeight: 35,
														}}
													>
														{column.items.map((item, index) => {
															return (
																<Draggable
																	key={item.id}
																	draggableId={item.id}
																	index={index}
																>
																	{(provided, snapshot) => {
																		return (
																			<div
																				ref={
																					provided.innerRef
																				}
																				{...provided.draggableProps}
																				{...provided.dragHandleProps}
																				style={{
																					userSelect:
																						'none',
																					margin: '6px 6px 6px 6px',
																					minHeight:
																						'35px',
																					padding: 10,
																					color: '#FFFAFA',
																					backgroundColor:
																						snapshot.isDragging
																							? '#264a2b'
																							: '#478645',
																					...provided
																						.draggableProps
																						.style,
																				}}
																			>
																				{item.content}
																			</div>
																		);
																	}}
																</Draggable>
															);
														})}
														{provided.placeholder}
													</div>
												);
											}}
										</Droppable>
									</div>
								</div>
							);
						})}
					</DragDropContext>
				</div>
			</div>
			<p>Uprawnienia: {isAuth.userRoles}</p>
		</div>
	);
}

export default Board;
