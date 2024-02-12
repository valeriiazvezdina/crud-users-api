import { User } from "../interfaces/interfaces";
import { v4 as uuidv4 } from 'uuid';

const users: Array<User> = [ {id: uuidv4(), username: 'valeriia', age: 22, hobbies: [ 'sport' ] } ];

export class UsersService {
    getAllUsers(): Array<User> {
        return users;
    }

    getUserById(id: string): User {
        const user = users.find(item => item.id === id)!;
        return user;
    }

    createUser(newUser: User) {
        newUser.id = uuidv4();

        users.push(newUser);
    }

    updateUser(id: string, updatedUser: User) {
        const oldUserId = users.findIndex(item => item.id === id);

        users.splice(oldUserId, 1, updatedUser);
    }

    deleteUser(id: string) {
        const userId = users.findIndex(item => item.id === id);

        users.splice(userId, 1);
    }
}