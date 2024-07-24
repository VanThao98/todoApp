import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { deleteUser, logout } from '../api/User';
import { TodoContext } from '../context/TodoConText';
import dayjs from 'dayjs';

export const Profile = () => {
  const {user, setUser} = useContext(UserContext);
  const {setTodo} = useContext(TodoContext);
  const navigate = useNavigate();

  const logoutHandle= async(e) => {
    const response = await logout();
    if(response.status === 200){
      alert("User Logged out");
      setUser({});
      setTodo({});
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      navigate('/user/login')
    }
  }

  const deleteHandle = async(e) => {
    if(window.confirm("Are you sure to destroy your account?")){
      try {
        const response = await deleteUser();
        if(response.status === 200){
          alert("User is destroyed");
          setUser({});
          navigate('/user/login')
        } else{
          alert (response.response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  return (
    <div className='sm:w-1/2 md:w-2/3 lg:w-2/4 m-auto text-center'>
      <h1 className='text-3xl my-3 font-bold'>
        Profile
      </h1>
      <div className='mt-3'>
        <h2 className='pl-2 text-2xl flex justify-between'>Name: {user.name}</h2>
        <h2 className='pl-2 text-2xl flex justify-between'>Email: {user.email} </h2>
        <h2 className='pl-2 text-2xl flex justify-between'>Age: {user.age}</h2>
      </div>
      <div className='mt-3'>
        <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500
         text-black w-full p-2 rounded my-2 '
         onClick={ () => navigate('/user/update')}>Update Profile</button>
        <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500
         text-black w-full p-2 rounded my-2 '
         onClick={ () => navigate('/user/updatepassword')}>Update Password</button>
        <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500
         text-black w-full p-2 rounded my-2 '
         onClick={logoutHandle}>Logout</button>
        <button className='bg-gradient-to-r from-red-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500
         text-black w-full p-2 rounded my-2 '
         onClick={deleteHandle}>Delete Account</button>
      </div>      
    </div>
  )
}