export const InputField = ({text,setText,addTodo}) => {
    return (
        <laberl>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => addTodo(text)}>Add Todo</button>
        </laberl>
    )
}