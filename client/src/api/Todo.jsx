import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const API_TODO ="/api/todos"
export const getAllTodo = async(e) => {
    try {
        const result = await axios.get(`${API_URL}${API_TODO}`);
        return result;
    } catch (error) {
        return error;
    }
};

export const getOneTodo = async(id) => {
    try {
        const result = await axios.get(`${API_URL}${API_TODO}/${id}`);
        return result;
    } catch (error) {
        return error;
    }
}

export const createTodo = async(todo) => {
    try {
        const result = await axios.post(`${API_URL}${API_TODO}/create`,todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodo = async(id,todo) => {
    try {
        const result = await axios.put(`${API_URL}${API_TODO}/update/${id}`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodoCompleted = async(id,todo) => {
    try {
        const result = await axios.put(`${API_URL}${API_TODO}/update/${id}/completed`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodoDeadline = async(id,todo) => {
    try {
        const result = await axios.put(`${API_URL}${API_TODO}/update/${id}/deadline`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodoLevel = async(id,todo) => {
    try {
        const result = await axios.put(`${API_URL}${API_TODO}/update/${id}/level`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteAllTodo = async(e) => {
    try {
        const result = await axios.delete(`${API_URL}${API_TODO}/delete/all`);
        return result;
    } catch (error) {
        return error;
    }
};

export const deleteOneTodo = async(id) => {
    try {
        const result = await axios.delete(`${API_URL}${API_TODO}/delete/${id}`);
        return result;
    } catch (error) {
        return error;
    }
}
