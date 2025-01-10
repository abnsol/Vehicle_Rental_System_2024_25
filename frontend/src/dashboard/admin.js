import { authGuard } from "../utils/authGuard";
import { getAllUsers, deleteUser, updateUser, promoteUser, demoteUser, getUserProfile, } from "../api/users";
import { getAllVehicles, deleteVehicle, updateVehicle, createVehicle, } from "../api/vehicle";
import { getAllBookings, deleteBooking, changeBookingStatus } from "../api/booking";
import { Modal } from "bootstrap";
if (!authGuard()) {
    window.location.href = "/login.html";
}
else {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const adminDashboardDiv = document.querySelector("#myTabContent");
            const vehicleTab = document.querySelector(".vehicle-table");
            const bookingTab = document.querySelector(".booking-table");
            const userTab = document.querySelector(".users-table");
            const adminTab = document.querySelector(".profile-tab");
            if (!adminDashboardDiv) {
                console.error("Admin dashboard container not found");
                return;
            }
            if (!vehicleTab) {
                console.error("Vehicle Tab not found");
                return;
            }
            if (!bookingTab) {
                console.error("Booking Tab not found");
                return;
            }
            if (!userTab) {
                console.error("User Tab not found");
                return;
            }
            if (!adminTab) {
                console.error("Profile Tab not found");
                return;
            }
            // Load initial data and setup event listeners
            await loadAdminDashboard();
            setupEventListeners();
            loadUserProfile();
            handleProfileUpdate();
        }
        catch (error) {
            console.error("Error initializing admin dashboard:", error);
        }
    });
}
async function loadAdminDashboard() {
    await loadVehicles();
    await loadBookings();
    await loadUsers();
}
async function loadVehicles() {
    const vehicleTab = document.querySelector(".vehicle-table");
    if (!vehicleTab)
        return;
    const vehicles = await getAllVehicles();
    vehicleTab.innerHTML = `
          <thead>
          <tr>
              <th style="padding: 10px 30px;">ID</th>
              <th style="padding: 10px 30px;">Car Brand</th>
              <th style="padding: 10px 30px;">Type</th>
              <th style="padding: 10px 30px;">Availability</th>
              <th style="padding: 10px 30px;">Price</th>
              <th style="padding: 10px 30px;">Actions</th>
          </tr>
          </thead>
            <tbody>
          ${vehicles
        .map((vehicle) => `
            <tr>
              <td style="padding: 10px 30px;">${vehicle.id}</td>
              <td style="padding: 10px 30px;">${vehicle.brand}</td>
              <td style="padding: 10px 30px;">${vehicle.group}</td>
              <td style="padding: 10px 30px;">${vehicle.available}</td>
              <td style="padding: 10px 30px;">${vehicle.price}</td>
              <td style="padding: 10px 30px;">
            <button class="btn btn-dark edit-vehicle" data-id="${vehicle.id}">Edit</button>
            <button class="btn btn-danger delete-vehicle" data-id="${vehicle.id}">Delete</button>
              </td>
            </tr>`).join("")}
            </tbody>
      `;
}
async function loadBookings() {
    const bookingTab = document.querySelector(".booking-table");
    if (!bookingTab)
        return;
    const bookings = await getAllBookings();
    bookingTab.innerHTML = `
            <thead>
          <tr>
              <th style="padding: 10px 30px;">Booking ID</th>
              <th style="padding: 10px 30px;">Car ID</th>
              <th style="padding: 10px 30px;">Pickup Date</th>
              <th style="padding: 10px 30px;">Drop-off Date</th>
              <th style="padding: 10px 30px;">Customer ID</th>
              <th style="padding: 10px 30px;">Status</th>
              <th style="padding: 10px 30px;">Actions</th>
          </tr>
          </thead>
          <tbody>
          ${bookings
        .map((booking) => `
            <tr>
              <td style="padding: 10px 30px;">${booking.id}</td>
              <td style="padding: 10px 30px;">${booking.vehicleId}</td>
              <td style="padding: 10px 30px;">${booking.startDate}</td>
              <td style="padding: 10px 30px;">${booking.endDate}</td>
              <td style="padding: 10px 30px;">${booking.userId}</td>
              <td style="padding: 10px 30px;">${booking.status}</td>
              <td style="padding: 10px 30px;">
                <button class="btn btn-success update-booking-status" data-id="${booking.id}" data-status="${booking.status}">Change Status</button>
                <button class="btn btn-danger delete-booking" data-id="${booking.id}">Delete</button>
              </td>
            </tr>`).join("")}
            </tbody>
      `;
}
async function loadUsers() {
    const userTab = document.querySelector(".users-table");
    if (!userTab)
        return;
    const users = await getAllUsers();
    userTab.innerHTML = `
            <thead>
          <tr>
            <th style="padding: 10px 30px;">ID</th>
            <th style="padding: 10px 30px;">Name</th>
            <th style="padding: 10px 30px;">Email</th>
            <th style="padding: 10px 30px;">Role</th>
            <th style="padding: 10px 30px;">Actions</th>
          </tr>
            </thead>
            <tbody>
          ${users
        .map((user) => `
              <tr>
            <td style="padding: 10px 30px;">${user.id}</td>
            <td style="padding: 10px 30px;">${user.firstName}</td>
            <td style="padding: 10px 30px;">${user.email}</td>
            <td style="padding: 10px 30px;">${user.role}</td>
            <td style="padding: 10px 30px;">
              <button class="btn btn-primary promote-user" data-id="${user.id}">Promote</button>
              <button class="btn btn-danger demote-user" data-id="${user.id}">Demote</button>
            </td>
              </tr>`)
        .join("")}
            </tbody>
      `;
}
function setupEventListeners() {
    const adminDashboardDiv = document.querySelector("#myTabContent");
    if (!adminDashboardDiv)
        return;
    adminDashboardDiv.addEventListener("click", handleAdminAction);
    const addVehicleButton = document.querySelector("#addVehicleBtn");
    addVehicleButton?.addEventListener("click", () => {
        const modalElement = document.getElementById("addVehicleModal");
        if (modalElement) {
            const addVehicleModal = new Modal(modalElement);
            addVehicleModal.show();
        }
    });
    const vehicleForm = document.getElementById("vehicleForm");
    vehicleForm?.addEventListener("submit", handleAddVehicle);
}
async function handleAdminAction(event) {
    const target = event.target;
    if (target.classList.contains("promote-user")) {
        const userId = target.getAttribute("data-id");
        if (userId) {
            try {
                const promotedUser = await promoteUser(Number(userId));
                if (promotedUser) {
                    alert(`${promotedUser.firstName} is promoted`);
                    await loadUsers();
                }
                else {
                    alert("could not promote user");
                }
            }
            catch (error) {
                console.error("Could not promote user:", error);
                alert("An error occurred while promoting the user");
            }
        }
    }
    if (target.classList.contains("demote-user")) {
        const userId = target.getAttribute("data-id");
        if (userId) {
            try {
                const demotedUser = await demoteUser(Number(userId));
                if (demotedUser) {
                    alert(`${demotedUser.firstName} is demoted`);
                    await loadUsers();
                }
                else {
                    alert("could not demote user");
                }
            }
            catch (error) {
                console.error("Could not demote user:", error);
                alert("An error occurred while demoting the user");
            }
        }
    }
    if (target.classList.contains("delete-user")) {
        const userId = target.getAttribute("data-id");
        if (userId) {
            try {
                const response = await deleteUser(userId);
                if (response) {
                    alert("Successfully deleted user");
                    await loadUsers();
                }
                else {
                    alert("Could not delete user");
                }
            }
            catch (error) {
                console.error("Could not delete user:", error);
                alert("An error occurred while deleting the user");
            }
        }
    }
    if (target.classList.contains("update-booking-status")) {
        const bookingId = target.getAttribute("data-id");
        const currentStatus = target.getAttribute("data-status");
        if (bookingId && currentStatus) {
            const newStatus = currentStatus === "PENDING" ? "CONFIRMED" : "COMPLETED";
            try {
                const response = await changeBookingStatus(Number(bookingId), newStatus);
                if (response) {
                    alert(`Booking status updated to ${newStatus}`);
                    await loadBookings();
                }
                else {
                    alert("Could not update booking status");
                }
            }
            catch (error) {
                console.error("Could not update booking status:", error);
                alert("An error occurred while updating booking status");
            }
        }
    }
    if (target.classList.contains("edit-vehicle")) {
        const vehicleId = Number(target.getAttribute("data-id"));
        const vehicles = await getAllVehicles();
        const vehicle = vehicles.find((v) => v.id === vehicleId);
        if (!vehicleId)
            return;
        if (!vehicle)
            return;
        document.getElementById("editVehicleId").value = String(vehicle.id);
        document.getElementById("editVehicleBrand").value =
            vehicle.brand;
        document.getElementById("editVehicleGroup").value =
            vehicle.group;
        // (document.getElementById("editVehicleAvailable") as HTMLInputElement).value =
        //   String(vehicle.available);
        document.getElementById("editVehiclePrice").value =
            String(vehicle.price);
        const editModal = new Modal(document.getElementById("editVehicleModal"));
        editModal.show();
        const editVehicleForm = document.getElementById("editVehicleForm");
        editVehicleForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const updatedVehicle = {
                id: Number(document.getElementById("editVehicleId").value),
                brand: document.getElementById("editVehicleBrand").value,
                group: document.getElementById("editVehicleGroup").value,
                // available: Boolean((document.getElementById("editVehicleAvailable") as HTMLInputElement).value),
                price: Number(document.getElementById("editVehiclePrice").value),
            };
            try {
                const response = await updateVehicle(vehicleId, updatedVehicle);
                if (response) {
                    alert("Successfully edited vehicle");
                    const modalElement = document.getElementById("editVehicleModal");
                    if (modalElement) {
                        const editVehicleModal = Modal.getInstance(modalElement) || new Modal(modalElement);
                        editVehicleModal.hide();
                    }
                    await loadVehicles();
                }
                else {
                    alert("Could not edit vehicle");
                }
            }
            catch (error) {
                console.error("Could not edit vehicle:", error);
                alert("An error occurred while edit the vehicle");
            }
            return;
        });
    }
    if (target.classList.contains("delete-vehicle")) {
        const vehicleId = target.getAttribute("data-id");
        if (vehicleId) {
            try {
                const response = await deleteVehicle(vehicleId);
                if (response) {
                    alert("Successfully deleted vehicle");
                    await loadVehicles();
                }
                else {
                    alert("Could not delete vehicle");
                }
            }
            catch (error) {
                console.error("Could not delete vehicle:", error);
                alert("An error occurred while deleting the vehicle");
            }
        }
    }
    if (target.classList.contains("delete-booking")) {
        const bookingId = target.getAttribute("data-id");
        if (bookingId) {
            try {
                const response = await deleteBooking(bookingId);
                if (response) {
                    alert("Successfully deleted Booking");
                    await loadBookings();
                }
                else {
                    alert("Could not delete user");
                }
            }
            catch (error) {
                console.error("Could not delete booking:", error);
                alert("An error occurred while deleting the ");
            }
        }
    }
}
async function handleAddVehicle(event) {
    event.preventDefault();
    const vehicleForm = document.getElementById("vehicleForm");
    const newVehicle = {
        model: document.getElementById("vehicleModel").value,
        brand: document.getElementById("vehicleBrand").value,
        group: document.getElementById("vehicleGroup").value,
        price: Number(document.getElementById("vehiclePrice").value),
        color: document.getElementById("vehicleColor").value,
        madeIn: document.getElementById("vehicleMadeIn").value,
        seatingCapacity: Number(document.getElementById("vehicleSeatingCapacity").value),
    };
    try {
        const response = await createVehicle(newVehicle);
        if (response) {
            alert("Successfully added new vehicle");
            const modalElement = document.getElementById("addVehicleModal");
            if (modalElement) {
                const addVehicleModal = Modal.getInstance(modalElement) || new Modal(modalElement);
                addVehicleModal.hide();
            }
            await loadVehicles();
        }
        else {
            alert("Could not add vehicle");
        }
    }
    catch (error) {
        console.error("Could not add vehicle:", error);
        alert("An error occurred while adding the vehicle");
    }
    vehicleForm.reset();
    return;
}
async function loadUserProfile() {
    const profile = await getUserProfile();
    const profileParagraph = document.querySelector(".profile-tab");
    if (profileParagraph) {
        profileParagraph.textContent = `Name: ${profile.firstName}, Email: ${profile.email}`;
    }
}
function handleProfileUpdate() {
    const updateProfileBtn = document.querySelector("#updateProfilebtn");
    updateProfileBtn?.addEventListener("click", () => {
        const modal = document.querySelector("#editProfileModal");
        const bootstrapModal = new Modal(modal);
        bootstrapModal.show();
    });
    const form = document.querySelector("#editProfileForm");
    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nameInput = form.querySelector('#editProfileName').value;
        const emailInput = form.querySelector('#editProfileEmail').value;
        try {
            const updatedUser = {
                firstName: nameInput,
                email: emailInput
            };
            const response = await updateUser(updatedUser);
            if (response) {
                alert("Profile updated!");
                const modal = document.querySelector("#editProfileModal");
                const bootstrapModal = Modal.getInstance(modal);
                bootstrapModal?.hide();
                loadUserProfile();
            }
            else {
                alert("Could not update profile");
            }
        }
        catch (error) {
            console.error("Error updating user profile:", error);
            alert("An error occurred while updating the user profile");
        }
    });
}
