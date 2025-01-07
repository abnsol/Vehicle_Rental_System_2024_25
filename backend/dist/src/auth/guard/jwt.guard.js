"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTGuard = void 0;
const passport_1 = require("@nestjs/passport");
class JWTGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
    }
}
exports.JWTGuard = JWTGuard;
//# sourceMappingURL=jwt.guard.js.map