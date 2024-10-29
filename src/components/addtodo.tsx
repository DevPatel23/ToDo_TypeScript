// aapne 4 vastu je CODE ma main chhe tene STORE(CONTEXT) ma nakhiye, jethi ene badhi jagya e easily USE kari sakay...
// store ma todos.tsx ma jovu

import { FormEvent, useState } from "react"
import { useTodos } from "../store/todos"; // aa context chhe

const AddToDo = () => {
    const[todo, setTodo] = useState("");
    const {handleAddToDo} = useTodos();
 
    // event obj no TYPE lakhyo
    const handleFormSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddToDo(todo) // aa function bolavyu jene CONTEXT ma banavyu chhe
        setTodo("")
    }

  return (
    <form onSubmit={handleFormSubmit}>
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button type="submit">Add</button>
    </form>
  )
}

export default AddToDo