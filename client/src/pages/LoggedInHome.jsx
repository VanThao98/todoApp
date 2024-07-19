import React, { useState } from 'react'
import { Todolist } from '../components/Todolist'
import { CategoryList } from '../components/CategoryList'
import { useNavigate } from 'react-router-dom';
import { createCategory, getAllCategory } from '../api/Category';


export const LoggedInHome = () => {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ categoryName: "", description: "" });
  const [categories, setCategories] = useState([]);

  const handleAddCategory = async () => {
    if (newCategory.categoryName.trim() && newCategory.description.trim()) {
      const result = await createCategory(newCategory);
      if (result.status === 201) {
        setNewCategory({ categoryName: "", description: "" });
        setShowForm(false); // Ẩn form sau khi thêm category
        const response = await getAllCategory();
      if (response.status === 200) {
        setCategories(response.data.data);
      } else {
        alert("Failed to fetch categories");
      }
      } else {
        alert(result.response.data.message);
      }
    } else {
      alert("Category name and description cannot be empty");
    }
  };
  return (
    <>
    <div className='flex m-2 px4'>
      <div className='w-1/6 mr-5 border-l-2 rounded-2xl text-center' >
        <h1 className='text-center text-3xl mb-4'>CATEGORY</h1>
        <CategoryList setFilterCategory={setFilterCategory} filterCategory={filterCategory} categories={categories} setCategories={setCategories}/>
        {showForm && (
          <div className="text-center p-2 mb-2 mt-2 w-full border rounded">
            <input 
              type="text" 
              value={newCategory.categoryName} 
              onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })} 
              placeholder="New Category" 
              className='text-center p-2 mb-2 w-full border rounded'
            />
            <input 
              type="text"
              value={newCategory.description} 
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} 
              placeholder="Description" 
              className='text-center p-2 mb-2 w-full border rounded'
            />
            <button onClick={handleAddCategory} className='text-white font-bold text-center p-2 mb-2'>Add Category</button>
          </div>
        )}
        <button onClick={() => {!showForm ? setShowForm(true): setShowForm(false)}} className={`${!showForm ? 'text-white': 'text-rose-600'} font-bold text-center p-2 mb-4 mt-2`}> {!showForm ? '+ Add...' : 'x Close'}</button>
      </div>
      <div className='grid grid-cols-4 gap-4 gap-y-10 mt-5 ' >
        {
          <Todolist filterCategory={filterCategory}/>
        }
        <div className='shadow-lg shadow-black w-72 min-h-70 m-auto max-h-80 border-2 border-emerald-900 rounded-2xl p-2'>
          <div className='border-dotted border-2 border-emerald-800 rounded-lg m-5 min-h-40 text-center content-center'>
            <button onClick={()=> {navigate('/todo/create')}} className='hover:text-violet-200 duration-500 ease-in-out relative'>+ Add New ...</button></div>          
          <div className='border-dotted border-2 border-emerald-800 rounded-lg ml-5 mr-5 min-h-12 text-black text-center content-center'>
            . . .
          </div>          
        </div>
      </div>
    </div>
    </>
  )
}
