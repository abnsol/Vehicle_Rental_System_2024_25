<<<<<<< HEAD
import { logout } from './auth/logout';

document.addEventListener("DOMContentLoaded", () => {
    const userProfileLink = document.getElementById('user-profile') as HTMLAnchorElement;
    const userinfo = localStorage.getItem('user');
    if (userinfo && userProfileLink){
        const userObject = JSON.parse(userinfo)
        if (userObject.role === "ADMIN"){
            userProfileLink.href= 'admin-panel.html';
        }else{
            userProfileLink.href = 'user-dashboard.html'
        }
    }
})
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { logout } from './auth/logout';
>>>>>>> e0a0371ce0b1bd80cc9de55f5d74efe29aef12e7

document.getElementById("logout-button")?.addEventListener("click", () => {
    logout();
});