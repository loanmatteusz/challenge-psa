import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthProviders } from './auth.providers';

@Module({
	providers: [AuthService, ...AuthProviders],
	controllers: [AuthController],
})
export class AuthModule {}
