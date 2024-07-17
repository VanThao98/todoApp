import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import { getUser } from "./api/User";
import { LoggedInHome } from "./pages/LoggedInHome";
import UnProtectedRoute from "./components/UnProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { CreateTodo } from "./pages/CreateTodo";
import { UpdateProfile } from "./pages/UpdateProfile";
import { UpdatePassword } from "./pages/UpdatePassword";
import { ViewTodo } from "./pages/ViewTodo";
import { UpdateTodo } from "./pages/UpdateTodo";
import { requestFCMToken } from "./utils/firebaseUtils";

function App() {
  const {user, setUser} = useContext(UserContext);
  const [fcmToken, setFcmToken] = useState(null);
  
  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        console.log("Requesting FCM token...");
        const token = await requestFCMToken();
        setFcmToken(token);
        console.log('FCM token: ', token);
      } catch (error) {
        console.error("Error fetching FCM token:", error);
      }
    };
    fetchFCMToken();
  }, []);

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const res = await getUser();
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [setUser]);

  return (
    <>
      {/* <div className="container firebase-form p-4">
        <div className="row">
          {fcmToken && (
            <div className="">
              <div className="alert alert-infor">
                <strong>fcmToken:</strong> {fcmToken}
              </div>
            </div>
          )}
        </div>
      </div> */}
      <div className="App bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Navbar user={user}/>
        <Routes>
          <Route path="/" element={ user._id ? <LoggedInHome/> : <Home/>}/>
          <Route path="/user/register"
            element={
              <UnProtectedRoute LoggedIn={user._id ? true : false}>
                <Register/>
              </UnProtectedRoute>
            }/>
          <Route path="/user/login" 
            element={
              <UnProtectedRoute LoggedIn={user._id ? true : false}>
                <Login/>
              </UnProtectedRoute>
            }/>
          <Route path="/user/profile"
            element ={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <Profile/>
              </ProtectedRoute>
            }/>
            <Route path="/todo/create"
              element ={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <CreateTodo/>
              </ProtectedRoute>
            }/>
            <Route path="/user/update"
            element ={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <UpdateProfile/>
              </ProtectedRoute>
            }/>
            <Route path="/user/updatepassword"
            element ={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <UpdatePassword/>
              </ProtectedRoute>
            }/>
            <Route path="/todo/view/:id"
            element ={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <ViewTodo />
              </ProtectedRoute>
            }/>
            <Route path="/todo/update/:id"
            element ={
              <ProtectedRoute LoggedIn={user._id ? true : false}>
                <UpdateTodo />
              </ProtectedRoute>
            }/>
        </Routes>
      </div>
    </>
  );
}

export default App;
