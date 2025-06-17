import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [AppConfigModule, PrismaModule, UserModule, AuthModule, CategoryModule, TransactionModule],
  controllers: [AppController],
})
export class AppModule {}
