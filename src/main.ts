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
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.IUserController).to(UsersController);
	bind<IUsersService>(TYPES.IUsersService).to(UsersService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
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
