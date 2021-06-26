import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';

const TodoList = () => {
	
	const dispatch = useDispatch()

	const todos = useSelector(state => state.todos.todosElements);
	const isLoading = useSelector(state => state.todos.isLoading);

	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	if (isLoading) return <h2>Loading...</h2>

	return (
		<ul className='list-group'>
			{todos.map(todo => (
				<TodoItem
					key={todo.id}
					id={todo.id}
					title={todo.title}
					completed={todo.completed}
				/>
			))}
		</ul>
	);
};

export default TodoList;
