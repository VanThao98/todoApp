import axios from "axios";

export const getAllCategory = async(e) => {
    try {
        const result = await axios.get("/api/categories")
        return result;
    } catch (error) {
        return error;
    }
}

export const getOneCategory = async(id) => {
    try {
        const result = await axios.get(`/api/categories/${id}`);
        return result;
    } catch (error) {
        return error;
    }
}

export const createCategory = async(category) => {
    try {
        const result = await axios.post("/api/categories/create", category);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateCategory = async(id, category) => {
    try {
        const result = await axios.put(`/api/categories/update/${id}`,category);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteAllCategory = async(e) => {
    try {
        const result = await axios.delete('/api/categories/all');
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteOneCategory = async(id) => {
    try {
        const result = await axios.delete(`/api/categories/delete/${id}`);
        return result;
    } catch (error) {
        return error;
    }

}

