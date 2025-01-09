import { logout } from './auth/logout';
document.addEventListener("DOMContentLoaded", () => {
    const userProfileLink = document.getElementById('user-profile');
    const userinfo = localStorage.getItem('user');
    if (userinfo && userProfileLink) {
        const userObject = JSON.parse(userinfo);
        if (userObject.role === "ADMIN") {
            userProfileLink.href = 'admin-panel.html';
        }
        else {
            userProfileLink.href = 'user-dashboard.html';
        }
    }
});
document.getElementById("logout-button")?.addEventListener("click", () => {
    logout();
});
