import { RoleType } from "../models/user.model.js";

function checkRole(
    userRole: RoleType,
    needRole: keyof typeof RoleType
): boolean {
    return userRole == needRole;
}

export { checkRole };
