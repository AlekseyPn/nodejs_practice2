import {BaseController} from "../common/base.controller";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "../errors/http-error";
import {ILoggerService} from "../logger/logger.interface";

export class UsersController extends BaseController {
    constructor(logger: ILoggerService) {
        super(logger);
        this.bindRoutes([{
            path: '/login',
            method: 'post',
            func: this.login,
        }, {
            path: '/register',
            method: 'post',
            func: this.register,
        }])
    }

    public login(req: Request, res: Response, next: NextFunction) {
        return next(new HttpError(401, 'Unauthorized', 'login'))
    }

    public register(req: Request, res: Response, next: NextFunction) {
        return this.ok(res, 'register')
    }
}
