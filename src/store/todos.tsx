import { ReactNode, createContext, useContext, useState } from "react";

//  ----3A
export type TodosProviderProps = {
    children : ReactNode
}

// 5. aapni APP ma "todos" array ma badhi vastu joiye chhe tena mate type lakhyo
export type Todo = {
    id:string;  //                                                    koi pn task add thay tyre teni ID
    task:string; //                                                   koi pn task STRING lakhi ne j add karis ne tena mate
    completed:boolean; //                                             checkbox par click kru tyre mate, ena aadhare delete button batavisu etle
    createdAt:Date;  //                                               date 
}

// 4. aa badhi vastu STORE thase, jene "todosContext" store kre chhe 1. ma
// mtlb TODO mate je badhu logic chhe, tena mate je kai pn joiye tene ahi TYPE define kryu, to j e STORE kri sakse ne em
// aama akhu LOGIC mate nu badhu DEFINE kryu TYPE, je kai pn use karsu te ahi define chhe ane niche VALUE ma pass karyu chhe, jethi badhe use thay  
export type TodosContext = {
    todos:Todo[]; //                                 aa todos array su store kre chhe, te uper TYPE define kryo chhe tena par thi khbr padi jase
    handleAddToDo:(task:string) => void; //          call signature
    toggleTodoAsCompleted:(id:string) => void; 
    handleDeleteTodo:(id:string) => void;
}

// 1.  akhi APP no badho DATA aa context STORE karse, etle eno type define krsu
export const todosContext = createContext<TodosContext | null >(null)

// 2.
export const TodosProvideer = ({children}:TodosProviderProps) => {
    // children no TYPE e aakhi APP nu badhu j store krse, etle reactNODE lakyu uper

    // 6B
    const[todos, setTodos] = useState<Todo[]>(() => {
        //10
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return []
        }
    })

    // 6.
    const handleAddToDo = (task:string) => {
        setTodos((prev) =>{
            // new Task ADD karis etle setTodos thi newTodos ne ADD kri desu  
          const newTodos:Todo[] = [
            {
                id:Math.random().toString(),
                task:task,
                completed:false,
                createdAt:new Date()
            },
            ...prev
          ] 
        //   console.log("my previous " + prev);          
        //   console.log(newTodos);       
           localStorage.setItem("todos",JSON.stringify(newTodos))
          return newTodos
        })
    }

    // 8.
    // mark compelted - checkbox select thay te mate nu logic
    const toggleTodoAsCompleted = (id:string) => {
        setTodos((prev) =>{
            let newTodos = prev.map((todo) => {
                if(todo.id === id){
                    return { ...todo, completed:!todo.completed }
                }
                return todo;
            })
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos
        })
    }

    // 9. delete the indivisual data 
    const handleDeleteTodo = (id:string) => {
        setTodos((prev) => {
            let newTodos = prev.filter((filterTodo) => filterTodo.id !== id); // je pn ID thi MATCH ni thay tene display karavye
            // jene clicke kryu teni ID tho MATCH thai gayi etle e jatu rey
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos;
        })
    }

    // 3B. aa {} ma je value lakhi chhe te important k context thi su provide karvana te
    // aa value ma je {} lakhyu chhe tene aapne USECONTEXT HOOK (niche nu USETODOS context) thi GET karsu jya pn joiye tya!
    return <todosContext.Provider value={{todos, handleAddToDo, toggleTodoAsCompleted,handleDeleteTodo}}>
        {children}
    </todosContext.Provider>
}

// 3C. context api/ consumer 
export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of Provider");
    }
    return todosConsumer;
}
