import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get('check')
	public check(): string {
		return `Server is ON!`;
	}
}
