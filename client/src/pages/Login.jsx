import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/User';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    const data = {
      email,
      password
    };
    const response = await login(data);
    if(response.status === 200){
      alert('User Logged In');
      setUser(response.data.user);
      // const expirationTime = new Date().getTime() + (60 * 60 * 1000);
      const expirationTime = new Date().getTime() + (60 * 60 * 1000);
      const token = response.data.token
      // save Token
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('expirationTime', JSON.stringify(expirationTime));
      console.log('Token-ngay sau login:', token);
      navigate('/');
    }else{
      alert(response.response.data.message);
    }
  }
// w-100 mt-0 border-none
  return (
    <div className='relative bg-opacity-60 sm:w-1/2 md:w-1/3 lg:w-1/4 m-auto text-center md:border-x-2 border-b-2 border-white rounded-md md:mt-5 p-3 shadow-2xl shadow-white'>
      <h1 className='text-3xl mb-3'>LOGIN</h1>
      <form className='' onSubmit={handleLogin}>
        <div className='mb-3'>
          <input type='email'
            placeholder='Enter Email...'
            className='focus:outline-none border-none p-2 rounded w-full'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <input type='password'
            placeholder='Enter Password...'
            className='focus:outline-none border-none p-2 rounded w-full'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-blade font-bold text-2xl w-full rounded p-2'>
          Login
        </button>
        <button onClick={()=>navigate('/')} className='text-violet-100 p-4 md:p-0 absolute -top-1 right-3 text-2xl font-bold'>x</button>
        <p>Do you have account? if not <button onClick={()=>navigate('/user/register')} className='text-sky-800 underline'>register</button></p>
      </form>
    </div>
  )
}
