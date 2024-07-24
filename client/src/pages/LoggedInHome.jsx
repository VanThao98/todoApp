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
  const [showCategory, setShowCategory] = useState(false);

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
    <div className={`flex justify-start relative`}>
      <div className={`${showCategory ? 'hidden' : 'block'} block lg:hidden `}>
        <button onClick={() => setShowCategory(!showCategory)} className='p-2'>
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>        
      </div>

      
      <div className={`${showCategory ? 'block' : 'hidden'} lg:block sm:w-1/6 md:w-1/4 lg:w-4/12 xl:w-1/5 mr-5 lg:border-l-2 rounded-2xl sm:text-center`}>
        <h1 onClick={()=>setShowCategory(!showCategory)} className=' sm:block hover:text-2xl text-center text-xl sm:text-2xl md-text-3xl mb-4'>CATEGORY</h1>
        <span className='hidden sm:block'><CategoryList setFilterCategory={setFilterCategory} filterCategory={filterCategory} categories={categories} setCategories={setCategories}/></span>
        {showForm && (
          <div className="hidden sm:block text-center p-2 mb-2 mt-2 w-full border rounded">
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
      <div className={`grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 gap-y-10 py-5 mt-5 xl:mt-0 px-5`}>
        {
          <Todolist filterCategory={filterCategory}/>
        }
        <div className='hidden sm:block shadow-lg shadow-black w-72 min-h-72 max-h-80 border-2 border-emerald-900 rounded-2xl'>
          <div className='border-dotted border-2 border-emerald-800 rounded-lg m-5 min-h-40 text-center content-center'>
            <button onClick={()=> {navigate('/todo/create')}} className='hover:text-violet-200 duration-500 ease-in-out relative'>+ Add New ...</button></div>          
          <div className='border-dotted border-2 border-emerald-800 rounded-lg ml-5 mr-5 min-h-12 text-black text-center content-center'>
            . . .
          </div>          
        </div>
        <div className='sm:hidden w-72 m-auto p-2'>        
            <button onClick={()=> {navigate('/todo/create')}} className='hover:text-violet-200 duration-500 rounded p-2 bg-amber-400 sm:bg-none ease-in-out relative'>+ Add New ...</button>        
        </div>
      </div>

      <div className={`${showCategory? 'block':'hidden'} lg:hidden absolute w-full bg-black`}>
          <div className='absolute w-screen h-screen bg-black opacity-50'></div>            
          <div className='absolute w-full bg-black pt-5'>
          <button onClick={()=>setShowCategory(!showCategory)} className='text-violet-100 absolute -top-1 right-3 text-2xl font-bold hover:text-rose-600 ease-in duration-300 p-5'>x</button>           
          <CategoryList setFilterCategory={setFilterCategory} filterCategory={filterCategory} categories={categories} setCategories={setCategories}/>
          <button onClick={() => {!showForm ? setShowForm(true): setShowForm(false); setShowCategory(!showCategory);}} className={`${!showForm ? 'text-black': 'text-rose-600'} hover:bg-rose-600 hover:text-white ease-in duration-300 bg-white w-full rounded-2xl font-bold text-center p-2 mb-4 mt-2`}> {!showForm ? '+ Add...' : 'x Close'}</button>
          </div>                    
      </div>
      {showForm && (
            <>
            <div onClick={()=>{setShowForm(!showForm)}} className='lg:hidden absolute w-screen h-screen opacity-50 bg-slate-500 '></div>
            <div className="lg:hidden bg-black absolute text-center p-2 mb-2 opacity-100 w-full rounded pt-10">
              <input
                type="text" 
                value={newCategory.categoryName}
                maxLength={18} 
                onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })} 
                placeholder="New Category" 
                className='outline-none p-2 mb-2 w-full border border-white bg-black rounded text-green-500'
              />
              <input 
                type="text"
                value={newCategory.description} 
                maxLength={50} 
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} 
                placeholder="Description" 
                className='outline-none p-2 mb-2 w-full border border-white bg-black rounded text-rose-500'
              />
              <button onClick={()=>setShowForm(!showForm)} className='text-rose-300 p-3 pl-5 absolute -top-1 right-1 text-2xl font-bold hover:text-rose-600 ease-in duration-300'>x</button>           

              <button onClick={handleAddCategory} className='text-black font-bold text-center p-2 mb-2 bg-white rounded-2xl hover:bg-rose-600 hover:text-white ease-in duration-300'>Add Category</button>
            </div>
            </>
          )}                  
    </div>
    </>
  )
}
