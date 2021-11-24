import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

function App() {
    const [columns, setColumns] = useState(backendColumns);
    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
            <DragDropContext onDragEnd={result => console.log(result)}>
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
                                                    padding: 4,
                                                    width: 300,
                                                    minHeight: 700
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
                                                                            margin: "5px 5px 10px 5px",
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
    );
}

export default App;
