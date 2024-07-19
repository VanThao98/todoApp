import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { updateUser } from '../api/User';
import { useNavigate } from 'react-router-dom';

export const UpdateProfile = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [age, setAge] = useState(user.age);

    const submitHandler = async(e) =>{
        e.preventDefault();
        const data = {
          name,
          email,
          age
        }
        const response = await updateUser(data);
        if(response.status === 200) {
          setUser(response.data.user);
          alert("user updated successfully");
          navigate('/user/profile')
        }else{
          alert(response.response.data.message);
        }
    }
    return (
        <div className='relative bg-opacity-60 w-4/12 m-auto text-center border-x-2 border-b-2 border-white rounded-md mt-5 p-3 shadow-2xl shadow-white'>
        <h1 className='text-3xl mb-3'>UPDATE</h1>
        <form className='' onSubmit={submitHandler}>
            <div className='mb-3'>
            <input type='text'
                placeholder='Enter Name...'
                className='focus:outline-none border-none p-2 rounded w-full'
                value={name}
                onChange={e => setName(e.target.value)}
            />
            </div>
            <div className='mb-3'>
            <input
                maxLength={50}
                type='email'
                placeholder='Enter Email...'
                className='focus:outline-none border-none p-2 rounded w-full'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            </div>
            <div className='mb-3'>
            <input
                min={5}
                type='number'
                placeholder='Enter Age...'
                className='focus:outline-none border-none p-2 rounded w-full'
                value={age}
                onChange={e => setAge(e.target.value)}
            />
            </div>
            <button
            type='submit'
            className='bg-black text-white w-full rounded p-2'>
            Update
            </button>
            <button onClick={()=>navigate('/user/profile')} className='text-violet-100 absolute -top-1 right-3 text-2xl font-bold'>x</button>
        </form>
        </div>
    )
}
