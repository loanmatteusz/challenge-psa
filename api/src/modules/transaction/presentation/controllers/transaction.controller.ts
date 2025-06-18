import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../../../auth/guards/jwt.guard';
import { CurrentUser } from '../../../auth/decorators/user.decorator';
import { IUserRequest } from '../../../auth/interfaces/user-request.interface';

import { ITransactionService } from '../../domain/services/transaction-service.interface';

import { Transaction } from '../../domain/entities/transaction.entity';
import { CreateTransactionDTO } from '../../presentation/dtos/create-transaction.dto';
import { GetTransactionsQueryDTO } from '../../presentation/dtos/get-transactions-query.dto';
import { UpdateTransactionDTO } from '../../presentation/dtos/update-transaction.dto';
import { TransactionProvidersEnum } from '../../shared/enums/transaction-providers.enum';

@ApiTags('[TRANSACTION]')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('transaction')
export class TransactionController {
    @Inject(TransactionProvidersEnum.TRANSACTION_SERVICE)
    private readonly transactionService: ITransactionService;

    @ApiOkResponse({
        type: Transaction,
        description: 'Transaction created successfully',
    })
    @Post()
    public async createTransaction(@CurrentUser() { id }: IUserRequest, @Body() data: CreateTransactionDTO) {
        return await this.transactionService.createTransaction(data, id);
    }

    @ApiOkResponse({
        type: Transaction,
        description: 'Transactions fetched successfully',
    })
    @Get()
    public async getTransactions(@CurrentUser() { id }: IUserRequest, @Query() query: GetTransactionsQueryDTO) {
        return await this.transactionService.getTransactions(query, id);
    }

    @ApiOkResponse({
        type: Transaction,
        description: 'Transaction fetched successfully',
    })
    @Get(":id")
    public async getTransaction(@CurrentUser() { id }: IUserRequest, @Param("id") transactionId: string) {
        return await this.transactionService.getTransactionById(transactionId, id);
    }

    @ApiOkResponse({
        type: Transaction,
        description: 'Transaction updated successfully',
    })
    @Put(":id")
    public async updateTransaction(
        @CurrentUser() { id }: IUserRequest,
        @Param("id") transactionId: string,
        @Body() payload: UpdateTransactionDTO,
    ) {
        return await this.transactionService.updateTransaction(transactionId, payload, id);
    }

    @ApiOkResponse({
        type: Transaction,
        description: 'Transaction deleted successfully',
    })
    @Delete(":id")
    public async deleteTransaction(
        @CurrentUser() { id }: IUserRequest,
        @Param("id") transactionId: string,
    ) {
        return await this.transactionService.deleteTransaction(transactionId, id);
    }
}
