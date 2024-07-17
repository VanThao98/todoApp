import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ user }) => {
  return (
    <nav className="bg-black py-3 text-white flex justify-between items-center">
      <h1 className="ml-5 font-bold text-2xl flex gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-8 text-pink-600"
        >
          <path
            fill-rule="evenodd"
            d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
            clip-rule="evenodd"
          />
          <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
        </svg>
        TO DO APP
      </h1>
      <ul className="flex">
        {user._id && (
          <>
            <li className="mr-3">
              <Link className="hover:text-pink-500" to="/">
                Home
              </Link>
            </li>
            <li className="mr-3">
              <Link className="hover:text-pink-500" to="/todo/create">
                Create Todo
              </Link>
            </li>
            <li className="mr-3">
              <Link className="hover:text-pink-500" to="/user/profile">
                Profile
              </Link>
            </li>
          </>
        )}

        {!user._id && (
          <>
            <li className="mr-3">
              <Link className="hover:text-pink-500" to="/user/register">
                Register
              </Link>
            </li>
            <li className="mr-3">
              <Link className="hover:text-pink-500" to="/user/login">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
