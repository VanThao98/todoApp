import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getOneTodo } from '../api/Todo';

export const ViewTodo = () => {
    const [todo, setTodo] = useState('');
    const {id} = useParams();
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchData = async() =>{
            const response = await getOneTodo(id);
            if(response.status === 200) {
                setTodo(response.data.todo);
            }else{
                alert(response.response.data.message)
            }
        }
        fetchData();
    },[id])
  return (
    <div className='relative p-2 px-10 rounded-xl border border-x-pink-300 shadow-2xl shadow-pink-300 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-1/4 m-auto py-2 mt-3'>
        {
            todo && <div>
                <h1 className='my-2 text-3xl text-center font-bold mt-4 bg-opacity-90 shadow-2xl rounded mx-8'>{todo.title}</h1>
                <hr className='border-black'></hr>
                <h2 className={`${todo.completed ? 'text-yellow-200' : 'text-violet-100'} text-center text-2xl mt-3`}>{todo.completed ? 'Completed':'Not Completed'}</h2>
                <div className='text-white'>
                <p className='mt-3'><b className='mr-16 text-black'>Desc:</b> {todo.description}</p>
                <p className='mt-3'><b className='mr-14 text-black'>Level:</b> {todo.level}</p>
                <p className='mt-3'><b className='mr-8 text-black'>Deadline:</b> {todo.deadline}</p>
                <p className='mt-3'><b className='mr-10 text-black'>Created:</b> {todo.createdAt}</p>
                </div>
                {/* <p className='mt-3'>Updated: {todo.updatedAt}</p> */}
                <h1 className='text-3xl text-center font-bold mt-4 opacity-35'>{todo.category}</h1>
                <button onClick={()=>navigate('/')} className='text-violet-100 absolute -top-1 right-3 text-2xl font-bold'>x</button>
            </div>
        }
    </div>
  )
}
