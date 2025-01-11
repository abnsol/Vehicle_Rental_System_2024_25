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
import { getAllAvailableVehicles } from "../api/vehicle.js";
import { authGuard } from "../utils/authGuard.js";
document.addEventListener("DOMContentLoaded", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!authGuard()) {
      window.location.href = "/login.html"; // Redirect if not authenticated
      return;
    }
    yield loadVehicles();
  })
);
function loadVehicles() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      console.log("hello from load vehicles");
      const vehicles = yield getAllAvailableVehicles();
      const vehicleListDiv = document.querySelector("#row"); // Target vehicle listing section
      if (vehicles && vehicleListDiv) {
        vehicleListDiv.innerHTML = "";
        const vehicleCards = vehicles.map((vehicle) => {
          const vehicleCard = document.createElement("div");
          vehicleCard.className = "col-md-4 col-10 mb-4"; // Assign appropriate classes
          vehicleCard.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${vehicle.brand}</h5>
                            <p class="card-text">Type: ${vehicle.group}, Features: ${vehicle.available}</p>
                            <p class="card-text"><strong>$${vehicle.price}/month</strong></p>
                            <a href="./details.html?id=${vehicle.id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                `;
          return vehicleCard;
        });
        vehicleCards.forEach((card) => vehicleListDiv.appendChild(card));
      } else {
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "No vehicles available.";
        if (vehicleListDiv) {
          vehicleListDiv.appendChild(errorDiv);
        }
      }
    } catch (error) {
      const errorDiv = document.createElement("div");
      errorDiv.textContent = "Error loading vehicles";
      const vehicleListDiv = document.querySelector(".row");
      if (vehicleListDiv) {
        vehicleListDiv.appendChild(errorDiv);
      }
    }
  });
}
