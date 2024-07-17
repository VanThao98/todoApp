import axios from 'axios';

export const register = async (user) => {
    try {
        const result = await axios.post("/api/users/register",user);
        return result;
    } catch (error) {
        return error;
    }
}

export const login = async (user) => {
    try {
        const result = await axios.post("/api/users/login",user);
        return result;
    } catch (error) {
        return error;
    }
}

export const logout = async () => {
    try {
        const result = await axios.get("/api/users/logout");
        return result;
    } catch (error) {
        return error;
    }
}

export const getUser = async () => {
    try {
        const result = await axios.get("/api/users/me");
        return result;
    } catch (error) {
        return error;
    }
}

export const updateUser = async (user) => {
    try {
        const result = await axios.put("/api/users/updatedetail",user);
        return result;
    } catch (error) {
        return error;
    }
}

export const updatePassword = async (data) => {
    try {
        const result = await axios.put("/api/users/updatepassword",data);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteUser = async () => {
    try {
        const result = await axios.delete("/api/users/delete");
        return result;
    } catch (error) {
        return error;
    }
}