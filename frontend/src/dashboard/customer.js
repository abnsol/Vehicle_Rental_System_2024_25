import { getUserBookings, deleteBooking } from "../api/booking";
import { updateUser } from "../api/users";
import { getUserProfile } from "../api/users";
import { Modal } from "bootstrap";
async function loadBookings() {
    const bookings = await getUserBookings();
    const tableBody = document.querySelector("tbody");
    if (!tableBody)
        return;
    tableBody.innerHTML = "";
    bookings.forEach((booking) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${booking.id}</td>
      <td>${booking.vehicleId}</td>
      <td>${booking.startDate}</td>
      <td>${booking.endDate}</td>
      <td>${booking.status}</td>
      <td>
        ${booking.status === "PENDING"
            ? `<button class="btn btn-secondary cancel-btn" data-id="${booking.id}">Cancel</button>`
            : ""}
      </td>`;
        tableBody.appendChild(row);
    });
    document.querySelectorAll(".cancel-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.dataset.id || "";
            await deleteBooking(id);
            await loadBookings();
        });
    });
}
async function loadUserProfile() {
    const profile = await getUserProfile();
    const profileParagraph = document.querySelector("#profile");
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
        await updateUser({ name: nameInput, email: emailInput });
        alert("Profile updated!");
        const modal = document.querySelector("#editProfileModal");
        const bootstrapModal = Modal.getInstance(modal);
        bootstrapModal?.hide();
        loadUserProfile();
    });
}
document.addEventListener("DOMContentLoaded", () => {
    loadBookings();
    loadUserProfile();
    handleProfileUpdate();
});
