import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Patch,
	Query,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

// GUARDS
import { JwtGuard } from '../auth/guards/jwt.guard';

// DECORATORS
import { CurrentUser } from '../auth/decorators/user.decorator';

// ENUMS
import { UserProvidersEnum } from './enums/user-providers.enum';

// INTERFACES
import { IUserService } from './interfaces/user-service.interface';
import { IUserRequest } from '../auth/interfaces/user-request.interface';

// DTOs
import { GetUsersQueryDTO } from './dtos/get-users-query.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserDTO } from './dtos/user.dto';

@ApiTags('[USER]')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
	@Inject(UserProvidersEnum.USER_SERVICE)
	private readonly userService: IUserService;

	@ApiOkResponse({
		type: UserDTO,
		description: 'User fetched successfully',
	})
	@Get('me')
	public async me(@CurrentUser() { id }: IUserRequest) {
		return this.userService.getUserById(id);
	}

	@ApiOkResponse({
		type: [UserDTO],
		description: 'Users fetched successfully',
	})
	@Get()
	public async getUsers(@Query() query: GetUsersQueryDTO) {
		return this.userService.getUsers(query);
	}

	@ApiOkResponse({
		type: UserDTO,
		description: 'User by ID fetched successfully',
	})
	@Get(':id')
	public async getUserById(@Param('id') userId: string) {
		return this.userService.getUserById(userId);
	}

	@ApiOperation({
		summary: 'ADMIN - Update a user',
		description: 'Only users with the ADMIN role can access this endpoint.',
	})
	@ApiOkResponse({
		type: UserDTO,
		description: 'User updated successfully',
	})
	@Patch(':id')
	public async updateUser(
		@Param('id') userId: string,
		@Body() payload: UpdateUserDTO,
	) {
		return this.userService.updateUser(userId, payload);
	}

	@ApiOperation({
		summary: 'ADMIN - Delete a user',
		description: 'Only users with the ADMIN role can access this endpoint.',
	})
	@ApiOkResponse({
		type: UserDTO,
		description: 'User deleted successfully',
	})
	@Delete(':id')
	public async deleteUser(
		@CurrentUser() { id }: IUserRequest,
		@Param('id') userId: string,
	) {
		return this.userService.deleteUser(userId);
	}
}
