export const fetchWrapper = async(url: string, options: RequestInit = {}) : 
Promise<any> => {
    try{
        const response = await fetch(url,options);
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get(`content-type`);
        if (contentType && contentType.includes('application/json')){
            return await response.json();
        }
<<<<<<< HEAD
        return response
=======
        return response.json()
>>>>>>> e0a0371ce0b1bd80cc9de55f5d74efe29aef12e7
    }catch(error){
        console.error('Fetch error:', error);
        throw error;
    }
};

