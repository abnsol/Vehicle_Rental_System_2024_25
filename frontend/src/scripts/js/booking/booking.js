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
import { createBooking } from "../api/booking.js";
import { getvehiclebyId } from "../api/vehicle.js";
import { authGuard } from "../utils/authGuard.js";
document.addEventListener("DOMContentLoaded", initializePage);
function initializePage() {
  if (!authGuard()) {
    window.location.href = "/login.html";
    return;
  }
  setupEventListeners();
  loadVehicleDetails();
}
function setupEventListeners() {
  const bookButton = document.querySelector("#book-button");
  bookButton === null || bookButton === void 0
    ? void 0
    : bookButton.addEventListener("click", handleBooking);
}
function loadVehicleDetails() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const vehicleId = urlParams.get("id");
      if (vehicleId) {
        const vehicle = yield getvehiclebyId(vehicleId);
        const bookingDetailDiv = document.querySelector("#rental-summary");
        if (vehicle && bookingDetailDiv) {
          showRentalSummary(vehicle, bookingDetailDiv);
        } else {
          alert("Vehicle details not found.");
        }
      }
    } catch (error) {
      console.error("Error loading vehicle details:", error);
      alert("Error loading vehicle details.");
    }
  });
}
function showRentalSummary(vehicle, container) {
  container.innerHTML = `
        <h2>Rental Summary</h2>
        <p><strong>Car:</strong> ${vehicle.brand}</p>
        <p><strong>Type: </strong> ${vehicle.group}</p>
        <p><strong>Daily Rate:</strong> $${vehicle.price}</p>
        <p><strong>Insurance:</strong> $5</p>
        <p><strong>Total:</strong> $${vehicle.price + 5} </p>
    `;
}
function handleBooking(event) {
  return __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const vehicleId = urlParams.get("id");
      if (!vehicleId) {
        throw new Error("Vehicle ID missing for booking");
      }
      const startDate = document.getElementById("pickUpDate");
      const endDate = document.getElementById("dropOffDate");
      const newBooking = {
        vehicleId: Number(vehicleId),
        startDate: startDate.value,
        endDate: endDate.value,
      };
      const response = yield createBooking(newBooking);
      if (response) {
        alert("Booking successful");
        window.location.href = "./listings.html";
      } else {
        alert("Could not book vehicle");
      }
    } catch (error) {
      console.error("Could not book vehicle:", error);
      alert("An error occurred while booking the vehicle");
    }
  });
}
