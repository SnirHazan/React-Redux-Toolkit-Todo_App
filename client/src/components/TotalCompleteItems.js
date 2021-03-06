import React from 'react';
import { useSelector } from 'react-redux'

const TotalCompleteItems = () => {
	const completeTodos = useSelector(state => state.todos.todosElements.filter(todo => todo.completed));
	return <h4 className='mt-3'>Total Complete Items: {completeTodos.length}</h4>;
};

export default TotalCompleteItems;
