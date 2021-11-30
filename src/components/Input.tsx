import React, { useState } from 'react';
import {Todo } from '../App';


interface TodoInputProps {
	addTodo: any,
}

function Input({addTodo}: TodoInputProps) {


	const todoObj: Todo = new Todo();

	const [todo, setTodo] = useState(todoObj);

	function submitTodo(event: any) {
		event.preventDefault();
		console.log('todo: ', todo);
		addTodo(todo);
		console.log(todoObj);
	}

	function handleTodoChange(event: React.ChangeEvent<HTMLInputElement>) {
		setTodo({ ...todo, content: event.target.value });
	}

	return (
		<div style={{ marginLeft: 30, marginRight: 30 }} onSubmit={submitTodo}>
			<div style={{ display: "flex", alignItems: "center" }}>
				<input
					type="text"
					placeholder="Wpisz zadanie"
					className="box"
					value={todo.content} 
					onChange={handleTodoChange}
				/>
				<button type="submit" className="ok" >OK</button>
			</div>
		</div>
	)
}

export default Input;