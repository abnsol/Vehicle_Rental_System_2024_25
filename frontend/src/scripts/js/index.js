var _a;
import { logout } from "./auth/logout.js";
document.addEventListener("DOMContentLoaded", () => {
  const userProfileLink = document.getElementById("user-profile");
  const userinfo = localStorage.getItem("user");
  if (userinfo && userProfileLink) {
    const userObject = JSON.parse(userinfo);
    if (userObject.role === "ADMIN") {
      userProfileLink.href = "admin-panel.html";
    } else {
      userProfileLink.href = "user-dashboard.html";
    }
  }
});
(_a = document.getElementById("logout-button")) === null || _a === void 0
  ? void 0
  : _a.addEventListener("click", () => {
      logout();
    });
