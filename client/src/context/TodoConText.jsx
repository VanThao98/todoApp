import { createContext, useState } from "react";

export const TodoContext = createContext({todo:{}, setTodo: () => {}})

export const TodoContextProvider = ({children}) => {
    const [todo, setTodo] = useState({});
    return (
        <TodoContext.Provider value={{todo, setTodo}}>
            {children}
        </TodoContext.Provider>
    )
}