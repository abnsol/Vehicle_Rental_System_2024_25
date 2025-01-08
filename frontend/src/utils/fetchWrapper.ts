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
        return response.json()
    }catch(error){
        console.error('Fetch error:', error);
        throw error;
    }
};

