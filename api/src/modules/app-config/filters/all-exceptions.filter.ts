import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionsFilter.name);

	public catch(exception: Error | HttpException, host: ArgumentsHost) {
		this.logger.error(exception?.message, exception?.stack);

		const context: HttpArgumentsHost = host.switchToHttp();
		const response = context.getResponse<Response>();
		const request = context.getRequest<Request>();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const message = this.getErrorMessage(exception);

		response.status(status).json({
			timestamp: new Date().toISOString(),
			path: request.url,
			method: request.method,
			error: message,
		});
	}

	private getErrorMessage(exception: Error) {
		if (exception instanceof HttpException) {
			if (typeof exception.getResponse() === 'object') {
				return exception.getResponse()['message'];
			}
			return exception.getResponse();
		} else if (exception.message) {
			return exception.message;
		} else {
			return exception;
		}
	}
}
