import axios from "axios";

export const getAllTodo = async(e) => {
    try {
        const result = await axios.get("/api/todos");
        return result;
    } catch (error) {
        return error;
    }
};

export const getOneTodo = async(id) => {
    try {
        const result = await axios.get(`/api/todos/${id}`);
        return result;
    } catch (error) {
        return error;
    }
}

export const createTodo = async(todo) => {
    try {
        const result = await axios.post("/api/todos/create",todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodo = async(id,todo) => {
    try {
        const result = await axios.put(`/api/todos/update/${id}`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodoCompleted = async(id,todo) => {
    try {
        const result = await axios.put(`/api/todos/update/${id}/completed`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodoDeadline = async(id,todo) => {
    try {
        const result = await axios.put(`/api/todos/update/${id}/deadline`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateTodoLevel = async(id,todo) => {
    try {
        const result = await axios.put(`/api/todos/update/${id}/level`, todo);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteAllTodo = async(e) => {
    try {
        const result = await axios.delete("/api/todos/delete/all");
        return result;
    } catch (error) {
        return error;
    }
};

export const deleteOneTodo = async(id) => {
    try {
        const result = await axios.delete(`/api/todos/delete/${id}`);
        return result;
    } catch (error) {
        return error;
    }
}
