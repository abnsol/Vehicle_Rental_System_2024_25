import { login as loginAPI} from '../api/auth';

document.addEventListener('DOMContentLoaded',() =>{
    const loginform = document.getElementById('login-form') as HTMLFormElement;

    if(loginform){
        loginform.addEventListener('submit', async(event) => {
            event.preventDefault();

            const emailError = document.getElementById('login-email-error') as HTMLDivElement;
            const passwordError = document.getElementById('login-password-error') as HTMLDivElement;

            emailError.textContent = '';
            passwordError.textContent = '';


            const emailinput = document.getElementById('login-email') as HTMLInputElement;
            const passwordinput = document.getElementById('login-password') as HTMLInputElement;

            if (!emailinput.value) {
                emailError.textContent = "Please enter email"
               return
            }
    
            if(!passwordinput.value) {
                passwordError.textContent = "Please enter a password"
                return
            }

            const credentials = {
                email: emailinput.value,
                password: passwordinput.value,
            };
            try{
                const response = await loginAPI(credentials);
                if(response && response.access_token){
                    localStorage.setItem('token', response.access_token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    const userinfo = localStorage.getItem('user');
                    if (userinfo) {
                        const userObject = JSON.parse(userinfo);
                        if (userObject.role === "ADMIN") {
                            window.location.href = './admin-panel.html';
                        }else {
                            console.log(localStorage.getItem('token'))
                            window.location.href = './listings.html';
                        }
                    }
                }
                else{
                    emailError.textContent = "Login Failed";
                    console.error('login failed')
                }
            } catch(error){
                emailError.textContent = "Login Failed: " + error;
            }
        });

    }else{
        console.error('login form not found on the page');
    }
});