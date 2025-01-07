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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const roles_guard_1 = require("../auth/roles/roles.guard");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const user_service_1 = require("./user.service");
const dto_1 = require("./dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getProfile(user) {
        return user;
    }
    getUsers() {
        return this.userService.getUsers();
    }
    getUserById(id) {
        return this.userService.getUserById(id);
    }
    editProfile(userId, dto) {
        return this.userService.editProfile(userId, dto);
    }
    promoteUserToAdmin(id) {
        return this.userService.promoteUserToAdmin(id);
    }
    demoteManagerToUser(id) {
        return this.userService.demoteAdminToUser(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, common_1.UseGuards)(roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.EditUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "editProfile", null);
__decorate([
    (0, common_1.Post)('promote'),
    (0, common_1.UseGuards)(roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "promoteUserToAdmin", null);
__decorate([
    (0, common_1.Post)('demote'),
    (0, common_1.UseGuards)(roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "demoteManagerToUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(guard_1.JWTGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map