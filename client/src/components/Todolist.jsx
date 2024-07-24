import React, { useContext, useEffect} from "react";
import { TodoContext } from "../context/TodoConText";
import { deleteOneTodo, getAllTodo } from "../api/Todo";
import { useNavigate } from "react-router-dom";

export const Todolist = ({ filterCategory }) => {
  const navigate = useNavigate();
  const { todo, setTodo } = useContext(TodoContext);

  const deleteHandle = async (item) => {
    if (window.confirm("Are you sure?")) {
      const response = await deleteOneTodo(item._id);
      if (response.status === 200) {
        alert(response.data.message);
        setTodo((prevTodos) => prevTodos.filter((todo) => todo._id !== item._id));
      } else {
        alert(response.response.data.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTodo();
        if (response.status === 200) {
          setTodo(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setTodo]);
  const todoArray = Array.isArray(todo) ? todo : [];
  const filteredTodo = filterCategory ? todoArray.filter(item => item.category === filterCategory) : todo;
  return (
    <>
      {filteredTodo.length > 0 &&
        filteredTodo.map((item) => {
          let bgLevel;
          if(item.level === "Low"){
            bgLevel = "bg-slate-600 text-white";
          }else if (item.level === "Medium"){
            bgLevel = "bg-lime-600 text-black"
          }else{bgLevel = "bg-red-500 opacity-100"}
          return (
          <div className="shadow-lg bg shadow-black w-72 md:w-72 min-h-64 max-h-80 border-2 border-emerald-900 rounded-2xl relative bg-amber-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500">
              <p className="text-3xl font-bold text-center my-3 mt-5">
                {item.title}
              </p>
              <p               
                readOnly
                className="resize-none border border-x-0 border-emerald-900 border-none rounded-lg w-full px-2 min-h-20 outline-none"
              >{`Desc: ${item.description}`}</p>
              <p className="font-semibold my-2 text m-2 mb-3">
                Deadline: {item.deadline}
              </p>
              <div className={`absolute -top-4 -right-1 ${bgLevel} border-emerald-900 border-2 rounded p-1 px-5`}>
                <p>{item.level}</p>
              </div>
              <div className="px-2 flex justify-between">
                <button
                  className={`${
                    item.completed ? "bg-lime-500" : "bg-red-500 opacity-80"
                  } font-bold p-1 rounded-xl`}
                >
                  {item.completed ? "Completed" : "Not Completed"}
                </button>
                <div>
                  <button onClick={() => navigate(`/todo/view/${item._id}`)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="size-8 text-slate-800"
                    >
                      <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      <path
                        fill-rule="evenodd"
                        d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className="mx-2"
                    onClick={() => navigate(`/todo/update/${item._id}`)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="size-8 text-sky-700"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className=""
                    onClick={() => {
                      deleteHandle(item);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="size-8 text-red-800"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="text-center text-xl font-bold opacity-20">
                <p>{item.category}</p>
              </div>
            </div>            
          );
        })}
    </>
  );
};