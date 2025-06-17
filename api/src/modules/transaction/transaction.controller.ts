import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransactionProvidersEnum } from './enums/transaction-providers.enum';
import { ITransactionService } from './interfaces/transaction-service.interface';
import { TransactionDTO } from './dtos/transaction.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { IUserRequest } from '../auth/interfaces/user-request.interface';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@ApiTags('[TRANSACTION]')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('transaction')
export class TransactionController {
    @Inject(TransactionProvidersEnum.TRANSACTION_SERVICE)
    private readonly transactionService: ITransactionService;

    @ApiOkResponse({
        type: TransactionDTO,
        description: 'Transaction created successfully',
    })
    @Post()
    public async createTransaction(@CurrentUser() { id }: IUserRequest, @Body() data: CreateTransactionDTO) {
        return await this.transactionService.createTransaction(data, id);
    }
}
