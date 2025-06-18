import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TransactionType } from '../../shared/enums/transaction-type.enum';

export class UpdateTransactionDTO {
    @ApiPropertyOptional({ type: String, description: 'Category ID' })
    public categoryId?: string;

    @ApiPropertyOptional({ enum: TransactionType, description: 'Transaction type' })
    @IsEnum(TransactionType, { message: 'Type must be income or expense' })
    public type?: TransactionType;

    @ApiPropertyOptional({ type: Number, description: 'Amount of transaction' })
    public amount?: number;

    @ApiPropertyOptional({ type: String, description: 'Transaction description' })
    public description?: string;
}
