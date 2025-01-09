import { fetchWrapper } from "../utils/fetchWrapper";

const API_BASE_URL ='http://localhost:3000/booking';

export const createBooking = async (bookingData: any) => {
    return fetchWrapper(`${API_BASE_URL}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingData),
    });
};
export const deleteBooking = async (id:string) => {
    return fetchWrapper(`${API_BASE_URL}/${id}`,{
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};


export const getAllBookings = async() =>{
    return fetchWrapper(`${API_BASE_URL}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}
export const getBookingbyId = async (id:string) => {
    return fetchWrapper(`${API_BASE_URL}/${id}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const getUserBookings = async () => {
    return fetchWrapper(`${API_BASE_URL}/user`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const changeBookingStatus = async (id: number, newStatus: string) => {
    return fetchWrapper(`${API_BASE_URL}/status`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({id, newStatus})
    })
}

export const updateBooking = async (id: number, bookingData: any) => {
    return fetchWrapper(`${API_BASE_URL}/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
    });
}