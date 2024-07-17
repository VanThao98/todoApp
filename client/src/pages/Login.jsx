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
      navigate('/');
    }else{
      alert(response.response.data.message);
    }
  }

  return (
    <div className='w-1/4 m-auto text-center'>
      <h1 className='text-3xl mb-3'>Login</h1>
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
      </form>
    </div>
  )
}
