import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class GetTransactionsQueryDTO {
    @ApiPropertyOptional({ enum: TransactionType, description: 'Transaction type' })
    @IsEnum(TransactionType, { message: 'Type must be income or expense' })
    @IsOptional()
    public type?: TransactionType;
}
