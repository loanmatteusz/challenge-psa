import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetCategoriesQueryDTO {
    @ApiPropertyOptional({ type: String, description: 'Name' })
    @IsOptional()
    @IsString()
    name?: string;
}
