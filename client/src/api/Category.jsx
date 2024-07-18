import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const API_Category ="/api/categories"
export const getAllCategory = async(e) => {
    try {
        const result = await axios.get(`${API_URL}${API_Category}`)
        return result;
    } catch (error) {
        return error;
    }
}

export const getOneCategory = async(id) => {
    try {
        const result = await axios.get(`${API_URL}${API_Category}/${id}`);
        return result;
    } catch (error) {
        return error;
    }
}

export const createCategory = async(category) => {
    try {
        const result = await axios.post(`${API_URL}${API_Category}/create`, category);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateCategory = async(id, category) => {
    try {
        const result = await axios.put(`${API_URL}${API_Category}/update/${id}`,category);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteAllCategory = async(e) => {
    try {
        const result = await axios.delete(`${API_URL}${API_Category}/all`);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteOneCategory = async(id) => {
    try {
        const result = await axios.delete(`${API_URL}${API_Category}/delete/${id}`);
        return result;
    } catch (error) {
        return error;
    }

}

