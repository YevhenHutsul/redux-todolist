import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddNewTask, fetchTodos } from './Store/todoSlice';
import './App.css';
import { TodoList } from './Components/TodoList';
import { InputField } from './Components/InputField';


const App = () => {
    const [text, setText] = useState('');
    const {status, error} = useSelector(state => state.todos);  

    const dispatch = useDispatch();

    const addTask = () => {
        dispatch(fetchAddNewTask( text ))
        setText('');
    }

    useEffect(() =>{
        dispatch(fetchTodos())
    }, [dispatch])

    return (
        <div className='app'>
            <InputField text={text} setText={setText} addTodo={addTask} />
            {status === 'loading' && <h2>loading</h2>}
            {error && <h2>Error: {error}</h2>}
            <TodoList />
        </div>
    )
}

export default App;