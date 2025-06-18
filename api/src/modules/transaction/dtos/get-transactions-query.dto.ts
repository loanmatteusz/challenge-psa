import { ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '../enums/transaction-type.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class GetTransactionsQuery {
    @ApiPropertyOptional({ enum: TransactionType, description: 'Transaction type' })
    @IsEnum(TransactionType, { message: 'Type must be income or expense' })
    @IsOptional()
    public type?: TransactionType;
}
