import { jwtDecode } from 'jwt-decode';

export const authGuard = (): boolean =>{
    const token = localStorage.getItem('token');

    if(!token){
        return false;
    }
    try{
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if(decodedToken.exp && decodedToken.exp < currentTime){
            localStorage.removeItem('token');
            localStorage.removeItem('user')
            return false
        }
        return true
    }catch(error){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.error('Invalid token:', error);
        return false;
    }
};