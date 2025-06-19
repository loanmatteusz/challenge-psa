import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class CreateTransactionDTO {
    @ApiProperty({ type: String, description: 'Category ID' })
    public categoryId: string;

    @ApiProperty({ enum: TransactionType, description: 'Transaction type' })
    @IsEnum(TransactionType, { message: 'Type must be income or expense' })
    public type: TransactionType;

    @ApiProperty({ type: Number, description: 'Amount of transaction' })
    public amount: number;

    @ApiPropertyOptional({ type: String, description: 'Transaction description' })
    public description?: string;
}
