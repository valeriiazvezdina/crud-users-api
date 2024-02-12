import { User } from "../interfaces/interfaces";
import { UsersService } from "../services/users.service";

const userService = new UsersService();

export class UsersController {
    getAllUsers() {
        return userService.getAllUsers();
    }

    getUserById(id: string) {
        return userService.getUserById(id);
    }

    createUser(newUser: User) {
        userService.createUser(newUser);
    }

    updateUser(id: string, updatedUser: User) {
        userService.updateUser(id, updatedUser);
    }

    deleteUser(id: string) {
        userService.deleteUser(id);
    }
}