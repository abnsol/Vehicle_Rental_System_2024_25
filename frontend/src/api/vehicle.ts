import { fetchWrapper } from "../utils/fetchWrapper";

const API_BASE_URL ='http://localhost:3000/vehicle';

export const getAllVehicles = async () => {
    return fetchWrapper(`${API_BASE_URL}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
};
export const getAllAvailableVehicles = async () => {
    return fetchWrapper(`${API_BASE_URL}/available`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
};
export const getvehiclebyId = async(id:string) =>{
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}
export const createVehicle = async (vehicleData: any) => {
    return fetchWrapper(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(vehicleData),
    });
}
export const updateVehicle = async (id: number, vehicleData: any) => {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(vehicleData),
    });
}
export const deleteVehicle = async(id:string) =>{
    return fetchWrapper(`${API_BASE_URL}/${id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}
