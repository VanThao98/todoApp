import axiosInstance from "../utils/axiosInstance";
const API_Category ="/api/categories"
export const getAllCategory = async(e) => {
    try {
        const result = await axiosInstance.get(`${API_Category}`)
        return result;
    } catch (error) {
        return error;
    }
}

export const getOneCategory = async(id) => {
    try {
        const result = await axiosInstance.get(`${API_Category}/${id}`);
        return result;
    } catch (error) {
        return error;
    }
}

export const createCategory = async(category) => {
    try {
        const result = await axiosInstance.post(`${API_Category}/create`, category);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateCategory = async(id, category) => {
    try {
        const result = await axiosInstance.put(`${API_Category}/update/${id}`,category);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteAllCategory = async(e) => {
    try {
        const result = await axiosInstance.delete(`${API_Category}/all`);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteOneCategory = async(id) => {
    try {
        const result = await axiosInstance.delete(`${API_Category}/delete/${id}`);
        return result;
    } catch (error) {
        return error;
    }

}

