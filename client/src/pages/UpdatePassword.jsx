import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../api/User';

export const UpdatePassword = () => {
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    
    const submitHandler = async(e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('password does not match');
            return;
        }
        const data = {
          password: currentPassword,
          newPassword: password,
        }
        const response = await updatePassword(data);
        if(response.status === 200) {
          setUser(response.data.user);
          alert("password updated successfully");
          navigate('/user/profile')
        }else{
          alert(response.response.data.message);
        }
    }
    return (
        <div className='relative bg-opacity-60 w-1/4 m-auto text-center border-x-2 border-b-2 border-white rounded-md mt-5 p-3 shadow-2xl shadow-white'>
        <h1 className='text-3xl mb-3'>Change Password</h1>
            <form className='' onSubmit={submitHandler}>
            <div className='mb-3'>
            <input type='password'
                placeholder='Enter Current Password...'
                className='focus:outline-none border-none p-2 rounded w-full'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            </div>
            <div className='mb-3'>
            <input type='password'
                placeholder='Enter New Password...'
                className='focus:outline-none border-none p-2 rounded w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className='mb-3'>
            <input type='password'
                placeholder='Confirm New Password...'
                className='focus:outline-none border-none p-2 rounded w-full'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
