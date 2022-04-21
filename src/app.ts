import express, {Express} from "express";
import {Server} from "http";
import {UsersController} from "./users/users.controller";
import {ILoggerService} from "./logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import 'reflect-metadata';

@injectable()
export class App {
    app: Express
    port: number
    server: Server;

    constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService,
                @inject(TYPES.UserController) private userController: UsersController,
                @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server listening on http://localhost:${this.port}`)
    }
}
