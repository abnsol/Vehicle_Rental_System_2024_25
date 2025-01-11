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
import { authGuard } from "../utils/authGuard.js";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  promoteUser,
  demoteUser,
  getUserProfile,
} from "../api/users.js";
import {
  getAllVehicles,
  deleteVehicle,
  updateVehicle,
  createVehicle,
} from "../api/vehicle.js";
import {
  getAllBookings,
  deleteBooking,
  changeBookingStatus,
} from "../api/booking.js";

if (!authGuard()) {
  window.location.href = "/login.html";
} else {
  document.addEventListener("DOMContentLoaded", () =>
    __awaiter(void 0, void 0, void 0, function* () {
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
        yield loadAdminDashboard();
        setupEventListeners();
        loadUserProfile();
        handleProfileUpdate();
      } catch (error) {
        console.error("Error initializing admin dashboard:", error);
      }
    })
  );
}
function loadAdminDashboard() {
  return __awaiter(this, void 0, void 0, function* () {
    yield loadVehicles();
    yield loadBookings();
    yield loadUsers();
  });
}
function loadVehicles() {
  return __awaiter(this, void 0, void 0, function* () {
    const vehicleTab = document.querySelector(".vehicle-table");
    if (!vehicleTab) return;
    const vehicles = yield getAllVehicles();
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
            .map(
              (vehicle) => `
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
            </tr>`
            )
            .join("")}
            </tbody>
      `;
  });
}
function loadBookings() {
  return __awaiter(this, void 0, void 0, function* () {
    const bookingTab = document.querySelector(".booking-table");
    if (!bookingTab) return;
    const bookings = yield getAllBookings();
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
            .map(
              (booking) => `
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
            </tr>`
            )
            .join("")}
            </tbody>
      `;
  });
}
function loadUsers() {
  return __awaiter(this, void 0, void 0, function* () {
    const userTab = document.querySelector(".users-table");
    if (!userTab) return;
    const users = yield getAllUsers();
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
            .map(
              (user) => `
              <tr>
            <td style="padding: 10px 30px;">${user.id}</td>
            <td style="padding: 10px 30px;">${user.firstName}</td>
            <td style="padding: 10px 30px;">${user.email}</td>
            <td style="padding: 10px 30px;">${user.role}</td>
            <td style="padding: 10px 30px;">
              <button class="btn btn-primary promote-user" data-id="${user.id}">Promote</button>
              <button class="btn btn-danger demote-user" data-id="${user.id}">Demote</button>
            </td>
              </tr>`
            )
            .join("")}
            </tbody>
      `;
  });
}
function setupEventListeners() {
  const adminDashboardDiv = document.querySelector("#myTabContent");
  if (!adminDashboardDiv) return;
  adminDashboardDiv.addEventListener("click", handleAdminAction);
  const addVehicleButton = document.querySelector("#addVehicleBtn");
  addVehicleButton === null || addVehicleButton === void 0
    ? void 0
    : addVehicleButton.addEventListener("click", () => {
        const modalElement = document.getElementById("addVehicleModal");
        if (modalElement) {
          const addVehicleModal = new bootstrap.Modal(modalElement);
          addVehicleModal.show();
        }
      });
  const vehicleForm = document.getElementById("vehicleForm");
  vehicleForm === null || vehicleForm === void 0
    ? void 0
    : vehicleForm.addEventListener("submit", handleAddVehicle);
}
function handleAdminAction(event) {
  return __awaiter(this, void 0, void 0, function* () {
    const target = event.target;
    if (target.classList.contains("promote-user")) {
      const userId = target.getAttribute("data-id");
      if (userId) {
        try {
          const promotedUser = yield promoteUser(Number(userId));
          if (promotedUser) {
            alert(`${promotedUser.firstName} is promoted`);
            yield loadUsers();
          } else {
            alert("could not promote user");
          }
        } catch (error) {
          console.error("Could not promote user:", error);
          alert("An error occurred while promoting the user");
        }
      }
    }
    if (target.classList.contains("demote-user")) {
      const userId = target.getAttribute("data-id");
      if (userId) {
        try {
          const demotedUser = yield demoteUser(Number(userId));
          if (demotedUser) {
            alert(`${demotedUser.firstName} is demoted`);
            yield loadUsers();
          } else {
            alert("could not demote user");
          }
        } catch (error) {
          console.error("Could not demote user:", error);
          alert("An error occurred while demoting the user");
        }
      }
    }
    if (target.classList.contains("delete-user")) {
      const userId = target.getAttribute("data-id");
      if (userId) {
        try {
          const response = yield deleteUser(userId);
          if (response) {
            alert("Successfully deleted user");
            yield loadUsers();
          } else {
            alert("Could not delete user");
          }
        } catch (error) {
          console.error("Could not delete user:", error);
          alert("An error occurred while deleting the user");
        }
      }
    }
    if (target.classList.contains("update-booking-status")) {
      const bookingId = target.getAttribute("data-id");
      const currentStatus = target.getAttribute("data-status");
      if (bookingId && currentStatus) {
        const newStatus =
          currentStatus === "PENDING" ? "CONFIRMED" : "COMPLETED";
        try {
          const response = yield changeBookingStatus(
            Number(bookingId),
            newStatus
          );
          if (response) {
            alert(`Booking status updated to ${newStatus}`);
            yield loadBookings();
          } else {
            alert("Could not update booking status");
          }
        } catch (error) {
          console.error("Could not update booking status:", error);
          alert("An error occurred while updating booking status");
        }
      }
    }
    if (target.classList.contains("edit-vehicle")) {
      const vehicleId = Number(target.getAttribute("data-id"));
      const vehicles = yield getAllVehicles();
      const vehicle = vehicles.find((v) => v.id === vehicleId);
      if (!vehicleId) return;
      if (!vehicle) return;
      document.getElementById("editVehicleId").value = String(vehicle.id);
      document.getElementById("editVehicleBrand").value = vehicle.brand;
      document.getElementById("editVehicleGroup").value = vehicle.group;
      // (document.getElementById("editVehicleAvailable") as HTMLInputElement).value =
      //   String(vehicle.available);
      document.getElementById("editVehiclePrice").value = String(vehicle.price);
      const editModal = new bootstrap.Modal(
        document.getElementById("editVehicleModal")
      );
      editModal.show();
      const editVehicleForm = document.getElementById("editVehicleForm");
      editVehicleForm.addEventListener("submit", (e) =>
        __awaiter(this, void 0, void 0, function* () {
          e.preventDefault();
          const updatedVehicle = {
            id: Number(document.getElementById("editVehicleId").value),
            brand: document.getElementById("editVehicleBrand").value,
            group: document.getElementById("editVehicleGroup").value,
            // available: Boolean((document.getElementById("editVehicleAvailable") as HTMLInputElement).value),
            price: Number(document.getElementById("editVehiclePrice").value),
          };
          try {
            const response = yield updateVehicle(vehicleId, updatedVehicle);
            if (response) {
              alert("Successfully edited vehicle");
              const modalElement = document.getElementById("editVehicleModal");
              if (modalElement) {
                const editVehicleModal =
                  bootstrap.Modal.getInstance(modalElement) ||
                  new bootstrap.Modal(modalElement);
                editVehicleModal.hide();
              }
              yield loadVehicles();
            } else {
              alert("Could not edit vehicle");
            }
          } catch (error) {
            console.error("Could not edit vehicle:", error);
            alert("An error occurred while edit the vehicle");
          }
          return;
        })
      );
    }
    if (target.classList.contains("delete-vehicle")) {
      const vehicleId = target.getAttribute("data-id");
      if (vehicleId) {
        try {
          const response = yield deleteVehicle(vehicleId);
          if (response) {
            alert("Successfully deleted vehicle");
            yield loadVehicles();
          } else {
            alert("Could not delete vehicle");
          }
        } catch (error) {
          console.error("Could not delete vehicle:", error);
          alert("An error occurred while deleting the vehicle");
        }
      }
    }
    if (target.classList.contains("delete-booking")) {
      const bookingId = target.getAttribute("data-id");
      if (bookingId) {
        try {
          const response = yield deleteBooking(bookingId);
          if (response) {
            alert("Successfully deleted Booking");
            yield loadBookings();
          } else {
            alert("Could not delete user");
          }
        } catch (error) {
          console.error("Could not delete booking:", error);
          alert("An error occurred while deleting the ");
        }
      }
    }
  });
}
function handleAddVehicle(event) {
  return __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    const vehicleForm = document.getElementById("vehicleForm");
    const newVehicle = {
      model: document.getElementById("vehicleModel").value,
      brand: document.getElementById("vehicleBrand").value,
      group: document.getElementById("vehicleGroup").value,
      price: Number(document.getElementById("vehiclePrice").value),
      color: document.getElementById("vehicleColor").value,
      madeIn: document.getElementById("vehicleMadeIn").value,
      seatingCapacity: Number(
        document.getElementById("vehicleSeatingCapacity").value
      ),
    };
    try {
      const response = yield createVehicle(newVehicle);
      if (response) {
        alert("Successfully added new vehicle");
        const modalElement = document.getElementById("addVehicleModal");
        if (modalElement) {
          const addVehicleModal =
            bootstrap.Modal.getInstance(modalElement) ||
            new bootstrap.Modal(modalElement);
          addVehicleModal.hide();
        }
        yield loadVehicles();
      } else {
        alert("Could not add vehicle");
      }
    } catch (error) {
      console.error("Could not add vehicle:", error);
      alert("An error occurred while adding the vehicle");
    }
    vehicleForm.reset();
    return;
  });
}
function loadUserProfile() {
  return __awaiter(this, void 0, void 0, function* () {
    const profile = yield getUserProfile();
    const profileParagraph = document.querySelector(".profile-tab");
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
          try {
            const updatedUser = {
              firstName: nameInput,
              email: emailInput,
            };
            const response = yield updateUser(updatedUser);
            if (response) {
              alert("Profile updated!");
              const modal = document.querySelector("#editProfileModal");
              const bootstrapModal = bootstrap.Modal.getInstance(modal);
              bootstrapModal === null || bootstrapModal === void 0
                ? void 0
                : bootstrapModal.hide();
              loadUserProfile();
            } else {
              alert("Could not update profile");
            }
          } catch (error) {
            console.error("Error updating user profile:", error);
            alert("An error occurred while updating the user profile");
          }
        })
      );
}
