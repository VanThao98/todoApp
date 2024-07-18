import axiosInstance from "../utils/axiosInstance";
const API_TODO ="/api/todos"
export const getAllTodo = async(e) => {
    try {
        const result = await axiosInstance.get(`${API_TODO}`);
        return result;
    } catch (error) {
        return error;
    }
};

export const getOneTodo = async(id) => {
    try {
        const result = await axiosInstance.get(`${API_TODO}/${id}`);
        return result;
    } catch (error) {
        return error;
    }
}

export const createTodo = async(todo) => {
    try {
        const result = await axiosInstance.post(`${API_TODO}/create`,todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodo = async(id,todo) => {
    try {
        const result = await axiosInstance.put(`${API_TODO}/update/${id}`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodoCompleted = async(id,todo) => {
    try {
        const result = await axiosInstance.put(`${API_TODO}/update/${id}/completed`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodoDeadline = async(id,todo) => {
    try {
        const result = await axiosInstance.put(`${API_TODO}/update/${id}/deadline`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodoLevel = async(id,todo) => {
    try {
        const result = await axiosInstance.put(`${API_TODO}/update/${id}/level`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteAllTodo = async(e) => {
    try {
        const result = await axiosInstance.delete(`${API_TODO}/delete/all`);
        return result;
    } catch (error) {
        return error;
    }
};

export const deleteOneTodo = async(id) => {
    try {
        const result = await axiosInstance.delete(`${API_TODO}/delete/${id}`);
        return result;
    } catch (error) {
        return error;
    }
}
