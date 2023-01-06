import { TodoItem } from "./TodoItem";
import { useSelector } from "react-redux";

export const TodoList = () => {
    const todos = useSelector(state => state.todos.todos);

    return (
        todos.map(todo => (<TodoItem 
            {...todo} 
            key={todo.id} />))
    )
}