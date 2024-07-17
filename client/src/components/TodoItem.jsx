import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteOneTodo } from '../api/Todo';

export const TodoItem = ({item, setTodo, todo}) => {
    const navigate = useNavigate();

    const deleteHandle = async(e) => {
        if(window.confirm("Are you sure?")){
            const response = await deleteOneTodo(item._id);
            if(response.status === 200){
                alert(response.data.message);
                setTodo(todo.filter(todoItem => todoItem._id !== item._id));    
            }else{
                alert(response.response.data.message);
            }    
        }
    }
  return (
    <tr>
        <td className='border py-2 px-4'>{item.title}</td>
        <td className='border py-2 px-4'>{item.description}</td>
        <td className='border py-2 px-4'>{item.completed? 'completed' : 'not completed'}</td>
        <td className='border py-2 px-4'><button onClick={()=>navigate(`/todo/view/${item._id}`)} className='bg-blue-500 text-white px-2 rounded'>View</button></td>
        <td className='border py-2 px-4'><button onClick={()=>navigate(`/todo/update/${item._id}`)} className='bg-green-500 text-white px-2 rounded'>Update</button></td>
        <td className='border py-2 px-4'><button onClick={deleteHandle} className='bg-red-500 text-white px-2 rounded'>Delete</button></td>
    </tr>
  )
}
