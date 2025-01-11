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
import { register as registerApi } from "../api/auth.js";
document.addEventListener("DOMContentLoaded", () => {
  const registerform = document.getElementById("register-form");
  if (registerform) {
    registerform.addEventListener("submit", (event) =>
      __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const emailInput = document.getElementById("register-email");
        const passwordInput = document.getElementById("register-password");
        const nameInput = document.getElementById("register-name");
        const confirmPasswordInput = document.getElementById(
          "register-confirm-password"
        );
        if (passwordInput.value !== confirmPasswordInput.value) {
          alert("Passwords do not match");
          return;
        }
        const userdata = {
          email: emailInput.value,
          password: passwordInput.value,
          firstName: nameInput.value,
        };
        try {
          const response = yield registerApi(userdata);
          if (response) {
            window.location.href = "./login.html";
          } else {
            alert("register failed");
            console.error("register failed");
          }
        } catch (error) {
          console.error("register failed!", error);
          alert("register failed:" + error);
        }
      })
    );
  } else {
    console.error("register form not found on the page");
  }
});
