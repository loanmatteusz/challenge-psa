import { ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '../enums/transaction-type.enum';
import { IsEnum } from 'class-validator';

export class GetTransactionsQuery {
    @ApiPropertyOptional({ type: String, description: 'Category ID' })
    public categoryId?: string;

    @ApiPropertyOptional({ enum: TransactionType, description: 'Transaction type' })
    @IsEnum(TransactionType, { message: 'Type must be income or expense' })
    public type?: TransactionType;

    @ApiPropertyOptional({ type: String, description: 'Date of transaction' })
    public date?: Date;
}
