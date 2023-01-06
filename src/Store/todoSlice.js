import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//helpers
const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

            if (!response.ok) {
                throw new Error('Bad response!')
            }
            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

export const fetchDeleteTodo = createAsyncThunk(
    'todos/fetchDeleteTodo',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Can\'n delete task')
            }
            dispatch(deleteTask({ id }))

        } catch (error) {
            return rejectWithValue(error.message);
        }



    }
)

export const fetchToggleStatus = createAsyncThunk(
    'todos/fetchToggleStatus',
    async function (id, { rejectWithValue, dispatch, getState }) {
        const todo = getState().todos.todos.find(todo => todo.id === id);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })

            })
            if (!response.ok) {
                throw new Error('Can\'n delete task')
            }

            dispatch(toggleComplited({ id }))
        } catch (error) {
            return rejectWithValue(error.message)
        }

    }
)

export const fetchAddNewTask = createAsyncThunk(
    'todos/fetchAddNewTask',
    async function (text, { rejectWithValue, dispatch }) {
        const todo = {
            title: text,
            userId: 1,
            completed: false
        }
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos    `, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })
            if (!response.ok) {
                throw new Error('Can\'n delete task')
            }
            const data = await response.json();
            data.id = data.id * Math.random();
            dispatch(addTodo(data))

        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        deleteTask(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        toggleComplited(state, action) {
            const toggledTodo = state.todos.find(todo => action.payload.id === todo.id);
            toggledTodo.completed = !toggledTodo.completed;
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
        [fetchDeleteTodo.rejected]: setError,
        [fetchToggleStatus.rejected]: setError,
    }
})



export const { addTodo, deleteTask, toggleComplited } = todoSlice.actions;
export default todoSlice.reducer;