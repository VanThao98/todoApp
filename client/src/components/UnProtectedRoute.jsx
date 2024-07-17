import { Navigate } from "react-router-dom";

const UnProtectedRoute = ({LoggedIn, children}) =>{
    if(LoggedIn){
        return (<Navigate to="/" replace />);
    }
    return children;
}

export default UnProtectedRoute;