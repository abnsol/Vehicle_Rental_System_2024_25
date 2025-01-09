import { getvehiclebyId } from "../api/vehicle";
import { authGuard } from "../utils/authGuard";

document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    if (!authGuard()) {
        window.location.href = '/login.html';
        return;
    }
    loadVehicleDetails();
}

async function loadVehicleDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const vehicleId = urlParams.get('id');

        if (!vehicleId) {
            throw new Error('Vehicle ID missing');
        }

        const vehicle = await getvehiclebyId(vehicleId);
        const vehicleDetailsDiv = document.querySelector('#vehicle-details');

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

                <a href="/booking.html?id=${vehicle.id}" class="btn btn-primary">Book Now</a>
            `;
        } else{
            const errorDiv = document.createElement('div')
            errorDiv.textContent = 'VehicledetailsDiv not found'
            const vehicleDetailsDiv = document.querySelector(".vehicle-details")
             if (vehicleDetailsDiv) {
               vehicleDetailsDiv.appendChild(errorDiv)
            }       
        }
     }catch(error){
        const errorDiv = document.createElement('div')
        errorDiv.textContent = 'VehicledetailsDiv not found'
        const vehicleDetailsDiv = document.querySelector(".vehicle-details")
        if (vehicleDetailsDiv) {
            vehicleDetailsDiv.appendChild(errorDiv);
        }
}
}
