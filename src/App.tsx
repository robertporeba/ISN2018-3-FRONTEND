import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";

const backendItems = [
    { id: uuid(), content: "Zadanie 1" },
    { id: uuid(), content: "Zadanie 2" }
];

const backendColumns = {
    [uuid()]: {
        name: "Do zrobienia",
        items: backendItems
    },
    [uuid()]: {
        name: "W trakcie",
        items: []
    },
    [uuid()]: {
        name: "Zrobione",
        items: []
    }
};

const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

function App() {
    const [columns, setColumns] = useState(backendColumns);
    return (
        <div>
            <div className="heading">KanbanMusic</div>
        <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>  
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>{"Nowe zadanie"}</h2>
                <div style={{ marginLeft: 30, marginRight: 30 }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="text"
                                placeholder="Wpisz zadanie"
                                className="box"
                            />
                            <button type="submit" className="ok">
                                OK
                            </button>
                        </div>
                </div>
            </div>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([columnId, column]) => {
                    return (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={columnId}>
                            <h2>{column.name}</h2>
                            <div style={{ marginLeft: 30, marginRight: 30 }}>
                                <Droppable droppableId={columnId} key={columnId}>
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
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: "none",
                                                                            margin: "6px 6px 6px 6px",
                                                                            minHeight: "35px",
                                                                            padding: 10,
                                                                            color: "#FFFAFA",
                                                                            backgroundColor: snapshot.isDragging ? "#264a2b" : "#478645",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        {item.content}
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    )
                })}
            </DragDropContext>
            </div>
        </div>
    );
}

export default App;
