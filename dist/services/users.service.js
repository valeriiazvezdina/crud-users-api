"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const notFoundError_1 = require("../errors/notFoundError");
const notValidInputError_1 = require("../errors/notValidInputError");
const uuid_1 = require("uuid");
const users = [{ id: (0, uuid_1.v4)(), username: 'valeriia', age: 22, hobbies: ['sport'] }];
class UsersService {
    getAllUsers() {
        return users;
    }
    getUserById(id) {
        const user = users.find(item => item.id === id);
        if (!user) {
            throw new notFoundError_1.NotFoundError();
        }
        return user;
    }
    createUser(newUser) {
        newUser.id = (0, uuid_1.v4)();
        users.push(newUser);
    }
    updateUser(id, updatedUser) {
        const oldUserId = users.findIndex(item => item.id === id);
        if (oldUserId === -1) {
            throw new notValidInputError_1.NotValidInputError();
        }
        users.splice(oldUserId, 1, updatedUser);
    }
    deleteUser(id) {
        const userId = users.findIndex(item => item.id === id);
        if (userId === -1) {
            throw new notValidInputError_1.NotValidInputError();
        }
        users.splice(userId, 1);
    }
}
exports.UsersService = UsersService;
