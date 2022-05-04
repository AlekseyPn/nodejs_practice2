import 'reflect-metadata';
import express, { Express } from 'express';
import { Server } from 'http';
import { ILoggerService } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserController } from './users/users.controller.interface';
import { json } from 'body-parser';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
		@inject(TYPES.IUserController) private userController: IUserController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server listening on http://localhost:${this.port}`);
	}
}
