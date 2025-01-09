import { fetchWrapper } from "../utils/fetchWrapper";
const API_BASE_URL = 'http://localhost:3000/auth';
export const login = async (credentials) => {
    return fetchWrapper(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
};
export const register = async (userData) => {
    return fetchWrapper(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};
