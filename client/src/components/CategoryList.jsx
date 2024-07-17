import React, { useContext, useEffect, useState } from "react";
import { deleteOneCategory, getAllCategory } from "../api/Category";
import { CategoryContext } from "../context/CategoryContext";

export const CategoryList = ({ setFilterCategory, filterCategory }) => {
  const [categories, setCategories] = useState([]);
  const { category, setCategory } = useContext(CategoryContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const deleteHandle = async (item) => {
    if (window.confirm("Are you sure?")) {
      const response = await deleteOneCategory(item._id);
      if (response.status === 200) {
        alert(response.data.message);
        const NewCategory = {...category};
        // setCategory(category.filter((categoryItem) => categoryItem._id !== item._id));
        delete NewCategory[item._id];
        setCategory(NewCategory);
      } else {
        alert(response.response.data.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCategory();
        if (response.status === 200) {
          setCategories(response.data.data);
        } else {
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [categories]);
  return (
    <table>
      <thead></thead>
      <tbody>
        <tr>
          <hr />
          <button
            onClick={() => setFilterCategory(null)}
            className={`text-xl hover:text-2xl p-4 ${
              filterCategory === null
                ? "text-red-500"
                : "text-yellow-300 hover:text-red-500"
            }`}
          >
            All
          </button>
          <hr />
        </tr>
        {categories.length > 0 &&
          categories.map((item) => {
            return (
              <>
                <tr key={item._id}>
                    <div className="flex justify-between">
                  <button
                    onClick={() => setFilterCategory(item.categoryName)}
                    className={`text-xl hover:text-2xl p-4 ${
                      filterCategory === item.categoryName
                        ? "text-red-500"
                        : "text-yellow-300 hover:text-red-500"
                    }`}
                  >
                    {item.categoryName}
                  </button>
                  <button
                    onClick={()=>{deleteHandle(item)}}
                    onMouseEnter={()=>{handleMouseEnter(item._id)}}
                    onMouseLeave={handleMouseLeave}
                    className={`${isHovered ? 'opacity-100' : 'opacity-5'} text-violet-100  text-2xl font-bold`}
                  >
                    x
                  </button>
                  </div>
                  <hr />
                </tr>
              </>
            );
          })}
      </tbody>
    </table>
  );
};
