import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetCategoriesQuery {
    @ApiPropertyOptional({ type: String, description: 'Name' })
    @IsOptional()
    @IsString()
    name?: string;
}
