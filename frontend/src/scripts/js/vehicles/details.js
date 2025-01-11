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
import { getvehiclebyId } from "../api/vehicle.js";
import { authGuard } from "../utils/authGuard.js";
document.addEventListener("DOMContentLoaded", initializePage);
function initializePage() {
  if (!authGuard()) {
    window.location.href = "/login.html";
    return;
  }
  loadVehicleDetails();
}
function loadVehicleDetails() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const vehicleId = urlParams.get("id");
      if (!vehicleId) {
        throw new Error("Vehicle ID missing");
      }
      const vehicle = yield getvehiclebyId(vehicleId);
      const vehicleDetailsDiv = document.querySelector("#vehicle-details");
      if (vehicle && vehicleDetailsDiv) {
        vehicleDetailsDiv.innerHTML = `
                <h2 class="mb-2">${vehicle.brand}</h2>
                <p class="mb-2"><strong>Type: </strong> ${vehicle.group}</p>
                <p class="mb-2"><strong>Model: </strong> ${vehicle.model}</p>
                <p class="mb-2"><strong>Features: </strong> ${vehicle.color}, ${vehicle.seatingCapacity} seats, automatic</p>
                <h4 class="mt-4">Pricing</h4>
                <p class="mb-2"><strong>Price:</strong> ${vehicle.price}</p>
                <p class="mb-2"><strong>Additional charges:</strong> $5 insurance</p>
                <p class="mb-2"><strong>Rental Policies:</strong> 100 miles per day mileage limit, additional mileage is $0.3/mile</p>

                <a href="./booking.html?id=${vehicle.id}" class="btn btn-primary">Book Now</a>
            `;
      } else {
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "VehicledetailsDiv not found";
        const vehicleDetailsDiv = document.querySelector(".vehicle-details");
        if (vehicleDetailsDiv) {
          vehicleDetailsDiv.appendChild(errorDiv);
        }
      }
    } catch (error) {
      const errorDiv = document.createElement("div");
      errorDiv.textContent = "VehicledetailsDiv not found";
      const vehicleDetailsDiv = document.querySelector(".vehicle-details");
      if (vehicleDetailsDiv) {
        vehicleDetailsDiv.appendChild(errorDiv);
      }
    }
  });
}
