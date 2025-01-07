"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_service_1 = require("./vehicle.service");
const dto_1 = require("./dto");
const guard_1 = require("../auth/guard");
const roles_guard_1 = require("../auth/roles/roles.guard");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
let VehicleController = class VehicleController {
    constructor(vehicleService) {
        this.vehicleService = vehicleService;
    }
    createVehicle(dto) {
        return this.vehicleService.createVehicle(dto);
    }
    getAllVehicles() {
        return this.vehicleService.getAllVehicles();
    }
    getAvailableVehicle() {
        return this.vehicleService.getAvailableVehicle();
    }
    getVehicleById(id) {
        return this.vehicleService.getVehicleById(id);
    }
    editVehicle(id, dto) {
        return this.vehicleService.editVehicle(id, dto);
    }
    deleteVehicle(id) {
        return this.vehicleService.deleteVehicle(id);
    }
    setAvailable(id) {
        return this.vehicleService.setAvailable(id);
    }
    setUnavailable(id) {
        return this.vehicleService.setUnavailable(id);
    }
};
exports.VehicleController = VehicleController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateVehicleDTO]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "createVehicle", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "getAllVehicles", null);
__decorate([
    (0, common_1.Get)('available'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "getAvailableVehicle", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "getVehicleById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.EditVehicleDTO]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "editVehicle", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "deleteVehicle", null);
__decorate([
    (0, common_1.Post)('available'),
    (0, common_1.UseGuards)(roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "setAvailable", null);
__decorate([
    (0, common_1.Post)('unavailable'),
    (0, common_1.UseGuards)(roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "setUnavailable", null);
exports.VehicleController = VehicleController = __decorate([
    (0, common_1.UseGuards)(guard_1.JWTGuard),
    (0, common_1.Controller)('vehicle'),
    __metadata("design:paramtypes", [vehicle_service_1.VehicleService])
], VehicleController);
//# sourceMappingURL=vehicle.controller.js.map