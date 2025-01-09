import { fetchWrapper } from "../utils/fetchWrapper";
const API_BASE_URL = 'http://localhost:3000/user';
export const getAllUsers = async () => {
    return fetchWrapper(`${API_BASE_URL}/users`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};
export const getUserProfile = async () => {
    return fetchWrapper(`${API_BASE_URL}/profile`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};
export const getUserById = async (id) => {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};
export const promoteUser = async (userId) => {
    console.log("Promoting user with ID:", userId);
    return fetchWrapper(`${API_BASE_URL}/promote/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId })
    });
};
export const demoteUser = async (userId) => {
    console.log("Demoting user with ID:", userId);
    return fetchWrapper(`${API_BASE_URL}/demote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId })
    });
};
export const createUser = async (userData) => {
    return fetchWrapper(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
};
export const updateUser = async (userData) => {
    return fetchWrapper(`${API_BASE_URL}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userData)
    });
};
export const deleteUser = async (id) => {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
    });
};
