import { Response, Router } from 'express';
import { TExpressReturn, IControllerRoute } from './route.interface';
import { ILoggerService } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IBaseController } from './base.controller.interface';

@injectable()
export abstract class BaseController implements IBaseController {
	private readonly _router: Router;

	constructor(private logger: ILoggerService) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public created(res: Response): TExpressReturn {
		return res.status(201);
	}

	public send<T>(res: Response, code: number, message: T): TExpressReturn {
		res.contentType('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): TExpressReturn {
		return this.send<T>(res, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middlewares = route.middlewares?.map((middleware) => middleware.execute.bind(middleware));
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
