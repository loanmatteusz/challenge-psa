import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enums/transaction-type.enum';
import { IsEnum } from 'class-validator';

export class TransactionDTO {
    @ApiProperty({ type: String, description: 'ID' })
    public id: string;

    @ApiProperty({ type: String, description: 'User ID' })
    public userId: string;

    @ApiProperty({ type: String, description: 'Category ID' })
    public categoryId: string;

    @ApiProperty({ enum: TransactionType, description: 'Transaction type' })
    @IsEnum(TransactionType, { message: 'Type must be income or expense' })
    public type: TransactionType;

    @ApiProperty({ type: Number, description: 'Amount of transaction' })
    public amount: number;

    @ApiProperty({ type: String, description: 'Transaction description' })
    public description?: string;

    @ApiProperty({ type: String, description: 'Date of transaction' })
    public date: Date;

    static fromPrisma(data: any): TransactionDTO {
        const dto = new TransactionDTO();
        dto.id = data.id;
        dto.type = data.type as TransactionType;
        dto.amount = Number(data.amount);
        dto.description = data.description;
        dto.categoryId = data.categoryId;
        dto.userId = data.userId;
        dto.date = data.date;

        if (data.category) {
            dto['category'] = data.category.name;
        }

        return dto;
    }

    static fromPrismaArray(dataArray: any[]): TransactionDTO[] {
        return dataArray.map(data => TransactionDTO.fromPrisma(data));
    }
}
