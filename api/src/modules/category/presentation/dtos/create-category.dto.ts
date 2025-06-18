import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDTO {
    @ApiProperty({ type: String, description: 'Name', example: "Payment", nullable: false })
    @IsNotEmpty({ message: "You need type a name to your category" })
    public name: string;
}
