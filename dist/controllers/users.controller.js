"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("../services/users.service");
const userService = new users_service_1.UsersService();
class UsersController {
    getAllUsers() {
        return userService.getAllUsers();
    }
    getUserById(id) {
        return userService.getUserById(id);
    }
    createUser(newUser) {
        userService.createUser(newUser);
    }
    updateUser(id, updatedUser) {
        userService.updateUser(id, updatedUser);
    }
    deleteUser(id) {
        userService.deleteUser(id);
    }
}
exports.UsersController = UsersController;
