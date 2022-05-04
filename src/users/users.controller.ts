import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error';
import { ILoggerService } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUsersService } from './user.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService, @inject(TYPES.IUsersService) private userService: IUsersService) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	public login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		next(new HttpError(401, 'Unauthorized', 'login'));
	}

	public async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HttpError(422, 'User is exists'));
		}

		this.ok(res, { email: result.email });
	}
}
