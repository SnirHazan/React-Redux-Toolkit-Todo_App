import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getTodosAsync = createAsyncThunk(
    'todo/getTodosAsync',
    async () => {
        const res = await fetch('http://localhost:7000/todos');
        if (res.ok) {
            const todos = await res.json();
            return { todos };
        }
    },
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async payload => {
        const res = await fetch('http://localhost:7000/todos', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: payload.title })
        });
        if (res.ok) {
            const todo = await res.json();
            return { todo };
        }
    },
);

export const toggleCompleteAsync = createAsyncThunk(
    'todos/completeTodoAsync',
    async payload => {
        const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: payload.completed })
        });
        if (res.ok) {
            const todo = await res.json();
            return { id: todo.id, completed: todo.completed };
        }
    },
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async payload => {
        const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            const todos = await res.json();
            return { todos };
        }
    },
);


const todoSlice = createSlice({
    name: "Todos",
    initialState: {
        todosElements: [],
        isLoading: true,
    },
    reducers: {
        addTodo: (state, action) => {
            const { title } = action.payload
            const newTodo = {
                id: Date.now(),
                title: title,
                completed: false
            }
            state.todosElements.push(newTodo);
        },
        toggleComplete: (state, action) => {
            const { id, completed } = action.payload
            const index = state.todosElements.findIndex(todo => todo.id === id);
            state.todosElements[index].completed = completed
        },
        deleteTodo: (state, action) => {
            const { id } = action.payload
            return { ...state, todosElements: state.todosElements.filter(todo => todo.id !== id) }
        }
    },
    extraReducers: {
        [getTodosAsync.pending]: (state, action) => {
            console.log('Loading...')
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            console.log('Loaded')
            return { todosElements: action.payload.todos, isLoading: false }
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.todosElements.push(action.payload.todo);
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload;
            const index = state.todosElements.findIndex(todo => todo.id === id);
            state.todosElements[index].completed = completed
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            state.todosElements = action.payload.todos;
        },
    }
});

export const {
    addTodo,
    toggleComplete,
    deleteTodo,
} = todoSlice.actions;
export default todoSlice.reducer;