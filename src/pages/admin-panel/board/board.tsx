import React, { useEffect, useState} from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Board.scss";
import DragEnd from "./components/DragEnd";
import Input from "./components/Input";
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import { useDispatch } from 'react-redux';
import useUserIdentity from '../../../hooks/use-user-identity';
import { logout } from '../../../actions/auth';
import { history } from '../../../utils/history';
import statusService from '../../../services/status.service';
export interface ITodo {
    content: string,
}

export class Todo{

    id: any;
    content: string;

    constructor(content: string = '') {
        this.id = uuid();
        this.content = content;
    }
}

const backendItems: Todo[] = [
    new Todo('Zadanie 1'),
    new Todo('Zadanie 2')
];



function Board() {
    

    const [columns, setColumns] = useState<any>();


	useEffect(() => {
		statusService
			.getallstatuses()
			.then((response) => {
				setColumns(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [columns]);

	const getAllStatuses = () => {
		statusService
			.getallstatuses()
			.then((response) => {
				setColumns(response);
			})
			.catch((err) => {
				console.log(err);
			});
	};



    const [todos, setTodos] = useState(backendItems);
    function addTodo(todo: Todo) {
        setTodos([todo, ...todos])
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
        <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>  
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h2>{"Nowe zadanie"}</h2>
                    <Input addTodo={addTodo} />
            </div>
           
            <DragDropContext onDragEnd={result => DragEnd(result, columns, setColumns)}>
                
            {columns !== undefined &&
      columns.map((column: any) => (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={column.id}>
                            <h2>{column.name}</h2>
                            <div style={{ marginLeft: 30, marginRight: 30 }}>
                                <Droppable droppableId={column.id} key={column.id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver ? "#808080" : "#d3d3d3",
                                                    padding: 1,
                                                    width: 300,
                                                    minHeight: 35
                                                }}
                                            >
                                            
                                                
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                    
                                </Droppable>
                            </div>
                        </div>
                    
                    ))}
            </DragDropContext>
     
            
            </div>
        </div>
        <p>Uprawnienia: {isAuth.userRoles}</p>
        </div>
    );
}

export default Board;