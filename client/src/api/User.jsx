import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const API_USER = "/api/users"
export const register = async (user) => {
    try {
        const result = await axios.post(`${API_URL}${API_USER}/register`,user);
        return result;
    } catch (error) {
        return error;
    }
}

export const login = async (user) => {
    try {
        const result = await axios.post(`${API_URL}${API_USER}/login`,user);
        return result;
    } catch (error) {
        return error;
    }
}

export const logout = async () => {
    try {
        const result = await axios.get(`${API_URL}${API_USER}/logout`);
        return result;
    } catch (error) {
        return error;
    }
}

export const getUser = async () => {
    try {
        const result = await axios.get(`${API_URL}${API_USER}/me`);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateUser = async (user) => {
    try {
        const result = await axios.put(`${API_URL}${API_USER}/updatedetail`,user);
        return result;
    } catch (error) {
        return error;
    }
}

export const updatePassword = async (data) => {
    try {
        const result = await axios.put(`${API_URL}${API_USER}/updatepassword`,data);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteUser = async () => {
    try {
        const result = await axios.delete(`${API_URL}${API_USER}/delete`);
        return result;
    } catch (error) {
        return error;
    }
}