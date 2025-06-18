import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateCategoryDTO {
    @ApiPropertyOptional({ type: String, description: 'Name' })
    @IsOptional()
    public name?: string;
}
