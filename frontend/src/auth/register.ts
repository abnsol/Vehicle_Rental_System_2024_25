import { register as registerApi } from "../api/auth"

document.addEventListener('DOMContentLoaded',() =>{
    const registerform = document.getElementById('register-form') as HTMLFormElement;

    if (registerform){
        registerform.addEventListener('submit', async (event) => {
            event.preventDefault();
      
              const emailInput = document.getElementById('register-email') as HTMLInputElement;
              const passwordInput = document.getElementById('register-password') as HTMLInputElement;
              const nameInput = document.getElementById('register-name') as HTMLInputElement;
              const confirmPasswordInput = document.getElementById('register-confirm-password') as HTMLInputElement;

              if(passwordInput.value !== confirmPasswordInput.value){
                alert('Passwords do not match');
                return
              }
              const userdata = {
                email: emailInput.value,
                password: passwordInput.value,
                firstName: nameInput.value
<<<<<<< HEAD
              };
=======
          };
          console.log(userdata)
>>>>>>> e0a0371ce0b1bd80cc9de55f5d74efe29aef12e7
              try{
                const response = await registerApi(userdata);
                if (response){
                    window.location.href = './login.html';
                }else{
                    alert('register failed')
                    console.error('register failed')
                }
<<<<<<< HEAD
=======
                
>>>>>>> e0a0371ce0b1bd80cc9de55f5d74efe29aef12e7
              }catch(error){
                console.error('register failed!', error);
                alert('register failed:' + error);
              }
        });
    }else{
    console.error('register form not found on the page');
    }
});

