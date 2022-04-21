import {App} from "./app";
import {ExceptionFilter} from "./errors/exception.filter";
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {Container} from "inversify";
import {ILoggerService} from "./logger/logger.interface";
import {TYPES} from "./types";
import {IExceptionFilter} from "./errors/exception.filter.interface";

const appContainer = new Container();
appContainer.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService)
appContainer.bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter)
appContainer.bind<UsersController>(TYPES.UserController).to(UsersController)
appContainer.bind<App>(TYPES.Application).to(App)

const app = appContainer.get<App>(TYPES.Application)
app.init();

export {app, appContainer}
