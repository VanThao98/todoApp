import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { getUser, logout } from "./api/User";
import { LoggedInHome } from "./pages/LoggedInHome";
import UnProtectedRoute from "./components/UnProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { CreateTodo } from "./pages/CreateTodo";
import { UpdateProfile } from "./pages/UpdateProfile";
import { UpdatePassword } from "./pages/UpdatePassword";
import { ViewTodo } from "./pages/ViewTodo";
import { UpdateTodo } from "./pages/UpdateTodo";
import { TodoContext } from "./context/TodoConText";

function App() {
  const { user, setUser } = useContext(UserContext);
  const { setTodo } = useContext(TodoContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUser();
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [setUser]);
  
  useEffect(() => {
    function checkLoginStatus() {
      const token = localStorage.getItem("token");
      const loginTime = localStorage.getItem("expirationTime");

      if (!token || !loginTime) {
        // Chưa đăng nhập hoặc không có thông tin đăng nhập
        logout();
        return;
      }

      const currentTime = new Date().getTime();
      const thirtyMinutes = 30 * 60 * 1000;

      if (currentTime - loginTime > thirtyMinutes) {
        // Đã quá 30 phút kể từ khi đăng nhập
        alert("You have been logged in for 30 minutes, please login again.");
        setUser({});
        setTodo({});
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        navigate("/user/login"); // Chuyển hướng đến trang đăng nhập
      }
    }

    // Kiểm tra trạng thái đăng nhập mỗi khi trang web được tải
    checkLoginStatus();
  }, [setUser, setTodo, navigate]);

  return (
    <>
      <div className="App bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={user._id ? <LoggedInHome /> : <Home />} />
          <Route
            path="/user/register"
            element={
              <UnProtectedRoute LoggedIn={user._id ? true : false}>
                <Register />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/user/login"
            element={
              <UnProtectedRoute LoggedIn={user._id ? true : false}>
                <Login />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo/create"
            element={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <CreateTodo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/update"
            element={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/updatepassword"
            element={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo/view/:id"
            element={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <ViewTodo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo/update/:id"
            element={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <UpdateTodo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
