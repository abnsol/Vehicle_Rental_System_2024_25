import { createBooking } from "../api/booking";
import { getvehiclebyId } from "../api/vehicle";
import { authGuard } from "../utils/authGuard";

document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    if (!authGuard()) {
        window.location.href = '/login.html';
        return;
    }
    setupEventListeners();
    loadVehicleDetails();
}

function setupEventListeners() {
    const bookButton = document.querySelector("#book-button");
    bookButton?.addEventListener('click', handleBooking);
}

async function loadVehicleDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const vehicleId = urlParams.get('id');

        if (vehicleId) {
            const vehicle = await getvehiclebyId(vehicleId);
            const bookingDetailDiv = document.querySelector('#rental-summary') as HTMLElement;

            if (vehicle && bookingDetailDiv) {
                showRentalSummary(vehicle, bookingDetailDiv);
            } else {
                alert('Vehicle details not found.');
            }
        }

        
    } catch (error) {
        console.error("Error loading vehicle details:", error);
        alert('Error loading vehicle details.');
    }
}

function showRentalSummary(vehicle: any, container: HTMLElement) {
    container.innerHTML = `
        <h2>Rental Summary</h2>
        <p><strong>Car:</strong> ${vehicle.brand}</p>
        <p><strong>Type: </strong> ${vehicle.group}</p>
        <p><strong>Daily Rate:</strong> $${vehicle.price}</p>
        <p><strong>Insurance:</strong> $5</p>
        <p><strong>Total:</strong> $${vehicle.price + 5} </p>
    `;
}

async function handleBooking(event: Event) {
    event.preventDefault();
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const vehicleId = urlParams.get('id');

        if (!vehicleId) {
            throw new Error('Vehicle ID missing for booking');
        }

        const startDate = document.getElementById("pickUpDate") as HTMLInputElement;
        const endDate = document.getElementById("dropOffDate") as HTMLInputElement;

        const newBooking = {
            vehicleId: Number(vehicleId),
            startDate: startDate.value,
            endDate: endDate.value,
        };

        const response = await createBooking(newBooking);
        if (response) {
            alert("Booking successful");
            window.location.href = '/listings.html';
        } else {
            alert("Could not book vehicle");
        }
    } catch (error) {
        console.error("Could not book vehicle:", error);
        alert("An error occurred while booking the vehicle");
    }
}
