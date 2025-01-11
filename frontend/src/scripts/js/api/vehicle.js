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
const API_BASE_URL = "http://localhost:3000/vehicle";
export const getAllVehicles = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
export const getAllAvailableVehicles = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/available`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
export const getvehiclebyId = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
export const createVehicle = (vehicleData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(vehicleData),
    });
  });
export const updateVehicle = (id, vehicleData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(vehicleData),
    });
  });
export const deleteVehicle = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
