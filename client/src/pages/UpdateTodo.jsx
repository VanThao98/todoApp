import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../context/TodoConText'
import { useNavigate, useParams } from 'react-router-dom';
import { updateTodo } from '../api/Todo';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { format } from 'date-fns';
import '../App.css'
import { getAllCategory } from '../api/Category';
export const UpdateTodo = () => {
    const {todo} = useContext(TodoContext);
    const {id} = useParams();
    const myTodo = todo.find((todo) => todo._id === id);
    const [title, setTitle] = useState(myTodo.title);
    const [description, setDescription] = useState(myTodo.description);
    const [completed, setCompleted] = useState (myTodo.completed);
    const [deadline, setDeadline] = useState(myTodo.deadline);
    const [level, setLevel] = useState(myTodo.level)
    const [category, setCategory] = useState(myTodo.category)
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])

    useEffect(()=>{
      const fetchData = async() =>{
          try {
              const response = await getAllCategory();
              if(response.status === 200){
                  setCategories(response.data.data);
          }else{}
          } catch (error) {
              console.log("Error fetching data:",error)
          }
      }
      fetchData();
    },[])

    const handleSubmit= async(e) => {
        e.preventDefault();
        const formattedDeadline = format(deadline, 'MM-dd-yyyy HH:mm');
        const data= {
            title, description, completed, level,
            deadline : formattedDeadline,
            category
        }
        const response = await updateTodo(id,data);
        if(response.status === 200){
            alert(response.data.message);
            navigate('/')
        }else{
            alert(response.response.data.message);
        }
    }
  return (
    <div className='relative bg-opacity-60 w-4/12 m-auto text-center border-x-2 border-b-2 border-white rounded-md mt-5 p-3 shadow-2xl shadow-white'>
      <h1 className='text-3xl mb-3 p-3 text-black font-bold shadow-xl'>UPDATE</h1>
      <form className='' onSubmit={handleSubmit}>
        <div className='mb-3 my-5 opacity-80'>
          <input type='text'
            placeholder='Enter Title...'
            className='focus:outline-none border p-2 rounded w-full shadow-2xl bg-blue-200'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-3 opacity-80'>
          <textarea minLength={10} maxLength={100} name="" id='' cols={30} 
            placeholder='Enter description...'
            className='focus:outline-none border-none p-2 rounded w-full bg-blue-200'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='mb-3 opacity-80'>
          <select
          className='focus:outline-none border p-2 rounded w-full shadow-2xl bg-blue-200'
          value={completed}
          onChange={(e)=> setCompleted(e.target.value)}>
            <option className='' value='false'>Not Completed</option>
            <option className='' value='true'>Completed</option>
          </select>
        </div>
        <div className='mb-3 flex text-2xl justify-between'>
          <p className='text-white'>Deadline : </p>
          <DateTimePicker format='MM-dd-yyyy HH:mm' onChange={setDeadline}
            value={deadline}/>
        </div>
        <div className='flex justify-between opacity-80'>
          <div className='mb-3 text-2xl flex '>
            <p className='text-white'> Level : </p>
            <select onChange={(e)=> setLevel(e.target.value)} className='ml-5 bg-blue-200 rounded outline-none' value={level}>
              <option className='bg-red-500' value='High'>High</option>
              <option className='bg-yellow-500' value='Medium'>Medium</option>
              <option className='bg-green-500' value='Low'>Low</option>
            </select>
          </div>
          <div className='mb-3 text-2xl flex'>
            <p className='text-white'>Category : </p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className='ml-5 bg-blue-200 rounded outline-none'
              value={category}
            >
              {categories.map((category) => (
                <option key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type='submit'
          className='bg-black text-white w-full rounded p-2'>
          Update
        </button>
        <button onClick={()=>navigate('/')} className='text-violet-100 absolute -top-1 right-3 text-2xl font-bold'>x</button>
      </form>
    </div>
  )
}
