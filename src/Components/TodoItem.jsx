export const TodoItem = ({id,text,isChecked,deleteTask,toggleComplited}) => {
    
    return (
        <li>
            <input
                type={'checkbox'}
                checked = {isChecked}
                onChange = {() => toggleComplited(id)}
            />
            <span>{text}</span>
            <span onClick={() => deleteTask(id)}></span>
        </li>
    )
}