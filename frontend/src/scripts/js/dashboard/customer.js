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
import { getUserBookings, deleteBooking } from "../api/booking.js";
import { updateUser } from "../api/users.js";
import { getUserProfile } from "../api/users.js";

function loadBookings() {
  return __awaiter(this, void 0, void 0, function* () {
    const bookings = yield getUserBookings();
    const tableBody = document.querySelector("tbody");
    if (!tableBody) return;
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
        ${
          booking.status === "PENDING"
            ? `<button class="btn btn-secondary cancel-btn" data-id="${booking.id}">Cancel</button>`
            : ""
        }
      </td>`;
      tableBody.appendChild(row);
    });
    document.querySelectorAll(".cancel-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        __awaiter(this, void 0, void 0, function* () {
          const id = e.target.dataset.id || "";
          yield deleteBooking(id);
          yield loadBookings();
        })
      );
    });
  });
}
function loadUserProfile() {
  return __awaiter(this, void 0, void 0, function* () {
    const profile = yield getUserProfile();
    const profileParagraph = document.querySelector("#profile");
    if (profileParagraph) {
      profileParagraph.textContent = `Name: ${profile.firstName}, Email: ${profile.email}`;
    }
  });
}
function handleProfileUpdate() {
  const updateProfileBtn = document.querySelector("#updateProfilebtn");
  updateProfileBtn === null || updateProfileBtn === void 0
    ? void 0
    : updateProfileBtn.addEventListener("click", () => {
        const modal = document.querySelector("#editProfileModal");
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
      });
  const form = document.querySelector("#editProfileForm");
  form === null || form === void 0
    ? void 0
    : form.addEventListener("submit", (e) =>
        __awaiter(this, void 0, void 0, function* () {
          e.preventDefault();
          const nameInput = form.querySelector("#editProfileName").value;
          const emailInput = form.querySelector("#editProfileEmail").value;
          yield updateUser({ firstName: nameInput, email: emailInput });
          alert("Profile updated!");
          const modal = document.querySelector("#editProfileModal");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          bootstrapModal === null || bootstrapModal === void 0
            ? void 0
            : bootstrapModal.hide();
          loadUserProfile();
        })
      );
}
document.addEventListener("DOMContentLoaded", () => {
  loadBookings();
  loadUserProfile();
  handleProfileUpdate();
});
