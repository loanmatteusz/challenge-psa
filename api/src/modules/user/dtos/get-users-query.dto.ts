import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class GetUsersQueryDTO {
	@ApiPropertyOptional({ type: String, description: 'Name' })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ type: String, description: 'Email' })
	@IsOptional()
	@IsEmail()
	email?: string;
}
