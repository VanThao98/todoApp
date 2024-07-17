import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { createTodo } from '../api/Todo';
import DateTimePicker from 'react-datetime-picker';
// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { format } from 'date-fns';
import '../App.css'
import { getAllCategory } from '../api/Category';
export const CreateTodo = () => {
  
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [level, setLevel] = useState('Low')

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Others");

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formattedDeadline = format(deadline, 'MM-dd-yyyy HH:mm');
    console.log(formattedDeadline);
    const data = {
      title, description,level,
      deadline: formattedDeadline,
      category
    }
    const response = await createTodo(data);
    if(response.status === 201){
      alert("Todo created");
      navigate('/');
    }else{
      alert(response.response.message)
    }
  }

  return (
    <div className='relative bg-opacity-60 w-4/12 m-auto text-center border-x-2 border-b-2 border-white rounded-md mt-5 p-3 shadow-2xl shadow-white'>
      <h1 className='text-3xl mb-3 p-3 text-black font-bold shadow-xl'>CREATE TODO</h1>
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
          <textarea name="" id='' cols={30} 
            placeholder='Enter description...'
            className='focus:outline-none border-none p-2 rounded w-full bg-blue-200'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='mb-3 flex text-2xl justify-between'>
          <p className='text-white'>Deadline : </p>
          <DateTimePicker format='MM-dd-yyyy HH:mm' onChange={setDeadline}
            value={deadline}/>
        </div>
        <div className='flex justify-between'>
          <div className='mb-3 text-2xl flex'>
            <p className='text-white'> Level : </p>
            <select onChange={(e)=> setLevel(e.target.value)} className='ml-5 bg-none bg-blue-200 rounded outline-none opacity-80' value={level}>
              <option className='bg-red-500' value='High'>High</option>
              <option className='bg-yellow-500' value='Medium'>Medium</option>
              <option className='bg-green-500' value='Low'>Low</option>
            </select>
          </div>
          <div className='mb-3 text-2xl flex '>
            <p className='text-white'>Category : </p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className='ml-5 bg-blue-200 rounded outline-none opacity-80'
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
          className='bg-black text-white font-bold text-2xl w-full rounded p-2 my-2'>
          create
        </button>
        <button onClick={()=>navigate('/')} className='text-violet-100 absolute -top-1 right-3 text-2xl font-bold'>x</button>
      </form>
    </div>
  )
}
