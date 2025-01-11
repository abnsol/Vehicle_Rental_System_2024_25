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
import { fetchWrapper } from "../utils/fetchWrapper.js";
const API_BASE_URL = "http://localhost:3000/user";
export const getAllUsers = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
export const getUserProfile = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
export const getUserById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
export const promoteUser = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log("Promoting user with ID:", userId);
    return fetchWrapper(`${API_BASE_URL}/promote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId }),
    });
  });
export const demoteUser = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log("Demoting user with ID:", userId);
    return fetchWrapper(`${API_BASE_URL}/demote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId }),
    });
  });
export const createUser = (userData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  });
export const updateUser = (userData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userData),
    });
  });
export const deleteUser = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
  });
