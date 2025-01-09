import { register as registerApi } from "../api/auth";
document.addEventListener('DOMContentLoaded', () => {
    const registerform = document.getElementById('register-form');
    if (registerform) {
        registerform.addEventListener('submit', async (event) => {
            event.preventDefault();
            const emailInput = document.getElementById('register-email');
            const passwordInput = document.getElementById('register-password');
            const nameInput = document.getElementById('register-name');
            const confirmPasswordInput = document.getElementById('register-confirm-password');
            if (passwordInput.value !== confirmPasswordInput.value) {
                alert('Passwords do not match');
                return;
            }
            const userdata = {
                email: emailInput.value,
                password: passwordInput.value,
                firstName: nameInput.value
            };
            try {
                const response = await registerApi(userdata);
                if (response) {
                    window.location.href = './login.html';
                }
                else {
                    alert('register failed');
                    console.error('register failed');
                }
            }
            catch (error) {
                console.error('register failed!', error);
                alert('register failed:' + error);
            }
        });
    }
    else {
        console.error('register form not found on the page');
    }
});
