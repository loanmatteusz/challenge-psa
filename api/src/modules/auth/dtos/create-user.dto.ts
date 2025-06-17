import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
	@ApiProperty({ type: String, description: 'Name', example: "Admin" })
	@IsString({ message: 'Name is required' })
	public name: string;

	@ApiProperty({ type: String, description: 'Email', example: "admin@mail.com" })
	@IsString({ message: 'Email is required' })
	@IsEmail()
	public email: string;

	@ApiProperty({ type: String, description: 'Password', example: "admin" })
	@IsString({ message: 'Password is required' })
	public password: string;
}
