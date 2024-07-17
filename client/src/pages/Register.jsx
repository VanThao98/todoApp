import React, { useContext, useState } from 'react';
import { register } from '../api/User';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const {setUser } = useContext(UserContext);

  const submitHandler = async(e) =>{
    e.preventDefault();
    if(password !== confirmPassword){
      alert('password does not match')
      return;
    }
    const data = {
      name,
      email,
      age,
      password
    }

    const response = await register(data);
    if(response.status === 201) {
      setUser(response.data.user);
      navigate('/user/login');
      alert("user registered successfully");
    }else{
      alert(response.response.data.message);
    }
  }  

  return (
    <div className='w-1/4 m-auto text-center'>
      <h1 className='text-3xl mb-3'>Register</h1>
      <form className='' onSubmit={submitHandler}>
        <div className='mb-3'>
          <input type='text'
            placeholder='Enter Name...'
            className='focus:outline-none border-none p-2 rounded w-full'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <input type='email'
            placeholder='Enter Email...'
            className='focus:outline-none border-none p-2 rounded w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <input type='number'
            placeholder='Enter Age...'
            className='focus:outline-none border-none p-2 rounded w-full'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <input type='password'
            placeholder='Enter Password...'
            className='focus:outline-none border-none p-2 rounded w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <input type='password'
            placeholder='Confirm Password...'
            className='focus:outline-none border-none p-2 rounded w-full'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-blade font-bold text-2xl w-full rounded p-2'>
          Register
        </button>
      </form>
    </div>
  )
}
