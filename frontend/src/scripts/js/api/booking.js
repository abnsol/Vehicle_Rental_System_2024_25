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
const API_BASE_URL = "http://localhost:3000/booking";
export const createBooking = (bookingData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(bookingData),
    });
  });
export const deleteBooking = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
export const getAllBookings = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
export const getBookingbyId = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
export const getUserBookings = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });
export const changeBookingStatus = (id, newStatus) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, newStatus }),
    });
  });
export const updateBooking = (id, bookingData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return fetchWrapper(`${API_BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
  });
