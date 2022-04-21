import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './exception.filter.interface';
import { HttpError } from './http-error';
import { ILoggerService } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { TExpressReturn } from '../common/route.interface';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): TExpressReturn {
		if (err instanceof HttpError) {
			this.logger.error(`[${err.context}] Error ${err.statusCode}: ${err.message}`);
			return res.status(err.statusCode).send({ error: err.message });
		} else {
			this.logger.error(`${err.message}`);
			return res.status(500).send({ error: err.message });
		}
	}
}
