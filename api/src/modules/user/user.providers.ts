import { Provider } from '@nestjs/common';

// ENUM
import { UserProvidersEnum } from './enums/user-providers.enum';

// SERVICES
import { UserService } from './user.service';

export const UserProviders: Provider[] = [
	{
		provide: UserProvidersEnum.USER_SERVICE,
		useClass: UserService,
	},
];
