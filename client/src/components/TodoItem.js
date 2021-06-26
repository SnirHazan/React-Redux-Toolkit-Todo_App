import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoAsync, toggleCompleteAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();

	const handleCompleteClicked = () => {
		dispatch(
			toggleCompleteAsync({
				id,
				completed: !completed,
			}),
		);
	};

	const handleDeleteClicked = () => {
		dispatch(
			deleteTodoAsync({
				id,
			}),
		);
	}
	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' className='mr-3' checked={completed} onChange={handleCompleteClicked} />
					{title}
				</span>
				<button className='btn btn-danger' onClick={handleDeleteClicked}>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
