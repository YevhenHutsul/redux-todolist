import { useDispatch } from 'react-redux';
import { fetchDeleteTodo, fetchToggleStatus } from '../Store/todoSlice';

export const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();

    return (
        <li key={id}>
            <input
                type={'checkbox'}
                checked={completed}
                onChange={() => dispatch(fetchToggleStatus(id))}
            />
            <span>{title}</span>
            <span onClick={() => dispatch(fetchDeleteTodo(id))}>&times;</span>
        </li>
    )
}