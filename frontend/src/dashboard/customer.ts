import { getUserBookings, deleteBooking } from "../api/booking";
import { updateUser } from "../api/users";
import { getUserProfile } from "../api/users";
import { Modal } from "bootstrap";

interface Booking {
  id: string;
  vehicleId: number;
  startDate: string;
  endDate: string;
  status: string;
}

async function loadBookings() {
  const bookings = await getUserBookings();
  const tableBody = document.querySelector("tbody");
  if (!tableBody) return;
  tableBody.innerHTML = "";
  (bookings as Booking[]).forEach((booking) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${booking.id}</td>
      <td>${booking.vehicleId}</td>
      <td>${booking.startDate}</td>
      <td>${booking.endDate}</td>
      <td>${booking.status}</td>
      <td>
        ${
          booking.status === "PENDING"
            ? `<button class="btn btn-secondary cancel-btn" data-id="${booking.id}">Cancel</button>`
            : ""
        }
      </td>`;
    tableBody.appendChild(row);
  });
  document.querySelectorAll(".cancel-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = (e.target as HTMLButtonElement).dataset.id || "";
      await deleteBooking(id);
      await loadBookings();
    });
  });
}

async function loadUserProfile() {
    const profile = await getUserProfile();
    const profileParagraph = document.querySelector("#profile") as HTMLParagraphElement;
    if (profileParagraph) {
        profileParagraph.textContent = `Name: ${profile.firstName}, Email: ${profile.email}`;
    }
}
function handleProfileUpdate() {
    const updateProfileBtn = document.querySelector("#updateProfilebtn");
    updateProfileBtn?.addEventListener("click", () => {
        const modal = document.querySelector("#editProfileModal") as HTMLElement;
        const bootstrapModal = new Modal(modal);
        bootstrapModal.show();
    });
    const form = document.querySelector("#editProfileForm");
    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nameInput = (form.querySelector('#editProfileName') as HTMLInputElement).value;
        const emailInput = (form.querySelector('#editProfileEmail') as HTMLInputElement).value;
        await updateUser({ name: nameInput, email: emailInput });
        alert("Profile updated!");
        const modal = document.querySelector("#editProfileModal") as HTMLElement;
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
