import express, {Express} from "express";
import {Server} from "http";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";
import {ILoggerService} from "./logger/logger.interface";

export class App {
    app: Express
    port: number
    server: Server;
    logger: ILoggerService;
    userController: UsersController;
    exceptionFilter: ExceptionFilter;

    constructor(logger: ILoggerService, userController: UsersController, exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
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
