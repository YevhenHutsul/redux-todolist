import { TodoItem } from "./TodoItem";

export const TodoList = ({todos,deleteTask,toggleComplited}) => {
    console.log(todos);
    return (
        todos.map(todo => <TodoItem key={todo.id} {...todo} deleteTask = {deleteTask} toggleComplited = {toggleComplited}/>)
    )
}