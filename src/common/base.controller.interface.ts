import { Response, Router } from 'express';
import { TExpressReturn } from './route.interface';

export interface IBaseController {
	readonly router: Router;
	created(res: Response): TExpressReturn;
	send<T>(res: Response, code: number, message: T): TExpressReturn;
	ok<T>(res: Response, code: number, message: T): TExpressReturn;
}
