
import { useTodos } from '../store/todos';
import { useSearchParams } from "react-router-dom";

const Todos = () => {
    // aatli vastu CONTEXT mathi use karvana chhe
    const {todos, toggleTodoAsCompleted, handleDeleteTodo} = useTodos();

    // 3.
    const [searchParams] = useSearchParams();
    let todos̥Data = searchParams.get("todos");
    console.log("🚀 ~ file: todos.tsx:10 ~ Todos ~ todos̥Data:", todos̥Data)

    // 1.
    let filterData = todos;

    // 4.
    if(todos̥Data === "active"){
        filterData = filterData.filter((task) => !task.completed  )
    }

    // 4.
    if(todos̥Data === "completed"){
        filterData = filterData.filter((task) => task.completed  )
    }

  return (
    <ul className="main-task">
        {
            // 2.
            // task je add thay chhe, tene DISPLAY pn karavana ne, tena par LOGIC ahi thi aapisu
            // k checkbox-click, deletebtn
            filterData.map((todo) => {
                return <li key={todo.id}>
                    <input type="checkbox"  id={`todo-${todo.id}`}
                        checked={todo.completed}
                        // click re tyre mate nu function
                        onChange={() => toggleTodoAsCompleted(todo.id)}
                    />
                    <label htmlFor={`todo-${todo.id}`} > {todo.task} </label>

                    {
                        // jo checked hoy to j button aavse, previously false chhe
                        todo.completed && (
                            <button type='button' 
                            onClick={() => handleDeleteTodo(todo.id)} >Delete</button>
                        )
                    }
                </li>
            })
        }
    </ul>
  )
}

export default Todos