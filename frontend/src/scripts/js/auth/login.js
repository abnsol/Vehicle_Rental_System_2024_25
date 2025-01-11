var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { login as loginAPI } from "../api/auth.js";
document.addEventListener("DOMContentLoaded", () => {
  const loginform = document.getElementById("login-form");
  if (loginform) {
    loginform.addEventListener("submit", (event) =>
      __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const emailError = document.getElementById("login-email-error");
        const passwordError = document.getElementById("login-password-error");
        emailError.textContent = "";
        passwordError.textContent = "";
        const emailinput = document.getElementById("login-email");
        const passwordinput = document.getElementById("login-password");
        if (!emailinput.value) {
          emailError.textContent = "Please enter email";
          return;
        }
        if (!passwordinput.value) {
          passwordError.textContent = "Please enter a password";
          return;
        }
        const credentials = {
          email: emailinput.value,
          password: passwordinput.value,
        };
        try {
          const response = yield loginAPI(credentials);
          if (response && response.access_token) {
            localStorage.setItem("token", response.access_token);
            localStorage.setItem("user", JSON.stringify(response.user));
            const userinfo = localStorage.getItem("user");
            if (userinfo) {
              const userObject = JSON.parse(userinfo);
              if (userObject.role === "ADMIN") {
                window.location.href = "./admin-panel.html";
              } else {
                console.log(localStorage.getItem("token"));
                window.location.href = "./listings.html";
              }
            }
          } else {
            emailError.textContent = "Login Failed";
            console.error("login failed");
          }
        } catch (error) {
          emailError.textContent = "Login Failed: " + error;
        }
      })
    );
  } else {
    console.error("login form not found on the page");
  }
});
