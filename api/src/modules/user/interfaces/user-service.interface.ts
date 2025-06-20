// DTOs
import { GetUsersQueryDTO } from '../dtos/get-users-query.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UserDTO } from '../dtos/user.dto';

export interface IUserService {
	getUserById(userId: string): Promise<UserDTO>;
	getUsers(payload: GetUsersQueryDTO): Promise<UserDTO[]>;
	updateUser(userId: string, payload: UpdateUserDTO): Promise<UserDTO>;
	deleteUser(userId: string): Promise<UserDTO>;
}
