import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const backendColumns = {
    [uuid()]: {
        name: "Do zrobienia",
    },
    [uuid()]: {
        name: "W trakcie",
    },
    [uuid()]: {
        name: "Zrobione",
    }
};

function App() {
    const [columns, setColumns] = useState(backendColumns);
    return (
        <div style={{display:"flex", justifyContent:"center", height:"100vh"}}>
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
                                                    background: snapshot.isDraggingOver ? "grey" : "lightgrey",
                                                    padding: 4,
                                                    width: 300,
                                                    minHeight: 700
                                                }}
                                            >
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
