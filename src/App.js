import React from 'react';
import { useState } from 'react';
import './App.css';
import { TodoList } from './Components/TodoList';
import { InputField } from './Components/InputField';

const App = () => {
    const [todos, setDotos] = useState([]);
    const [text, setText] = useState('');

    const addTodo = (todo) => {
        if (todo.trim().length) {
            setDotos([
                ...todos,
                {
                    id: new Date().toISOString,
                    isChecked: false,
                    task: text,
                }
            ])
            setText('');
        }
    }

    const deleteTask = (todoId) => {
        setDotos(todos.filter(todo => todoId !== todo.id));
    }

    const toggleComplited = (todoId) => {
        setDotos(
            todos.map(
                todo => {
                    if (todoId !== todo.id) return todo;
                    return {
                        ...todo,
                        isChecked: !todo.isChecked,
                    }
                }))
    }

    return (
        <div className='app'>
            <InputField text = {text } setText = {setText} addTodo = {addTodo}/>

            <TodoList
                todos={todos}
                deleteTask={deleteTask}
                toggleComplited={toggleComplited}
            />
        </div>
    )
}

export default App;