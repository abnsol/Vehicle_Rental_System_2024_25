import { getAllAvailableVehicles } from "../api/vehicle";
import { authGuard } from "../utils/authGuard";

document.addEventListener('DOMContentLoaded', async () => {
    if (!authGuard()) {
        window.location.href = '/login.html'; // Redirect if not authenticated
        return;
    }
    await loadVehicles();
});

async function loadVehicles() {
    try {
        const vehicles: { id: number; brand: string; group: string; available: string; price: number}[] = await getAllAvailableVehicles(); 
        const vehicleListDiv = document.querySelector('#row') as HTMLElement; // Target vehicle listing section

        if (vehicles && vehicleListDiv) {
            vehicleListDiv.innerHTML = '';
            const vehicleCards = vehicles.map((vehicle) => {
                const vehicleCard = document.createElement('div');
                vehicleCard.className = 'col-md-4 col-10 mb-4'; // Assign appropriate classes
                vehicleCard.innerHTML = `
                    <div class="card h-100">
                        <img src="../assets/Img-filler-1.jpg" class="card-img-top border" alt="${vehicle.brand}">
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
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'No vehicles available.';
            if (vehicleListDiv) {
                vehicleListDiv.appendChild(errorDiv);
            }
        }
    } catch (error) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Error loading vehicles';
        const vehicleListDiv = document.querySelector('.row');
        if (vehicleListDiv) {
            vehicleListDiv.appendChild(errorDiv);
        }
    }
}

