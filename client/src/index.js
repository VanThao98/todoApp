import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import { TodoContextProvider } from './context/TodoConText';
import { CategoryContextProvider } from './context/CategoryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <CategoryContextProvider>
        <TodoContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TodoContextProvider>
      </CategoryContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);