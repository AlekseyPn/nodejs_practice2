import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILoggerService } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserController } from './users/users.controller.interface';
import { UsersService } from './users/users.service';
import { IUsersService } from './users/user.service.interface';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.IUserController).to(UsersController);
	bind<IUsersService>(TYPES.IUsersService).to(UsersService);
	bind<App>(TYPES.Application).to(App);
});

export interface IBootstrap {
	appContainer: interfaces.Container;
	app: App;
}

function bootstrap(): IBootstrap {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
