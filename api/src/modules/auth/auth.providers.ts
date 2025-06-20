import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// ENUMS
import { AuthProvidersEnum } from './enums/auth-providers.enum';

// GUARDS
import { JwtGuard } from './guards/jwt.guard';

// SERVIVCES
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';

export const AuthProviders: Provider[] = [
	{
		provide: AuthProvidersEnum.AUTH_SERVICE,
		useClass: AuthService,
	},
	{
		provide: AuthProvidersEnum.JWT_SERVICE,
		useClass: JwtService,
	},
	{
		provide: AuthProvidersEnum.JWT_GUARD,
		useClass: JwtGuard,
	},
	JwtStrategy,
];
