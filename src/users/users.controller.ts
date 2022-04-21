import {BaseController} from "../common/base.controller";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "../errors/http-error";
import {ILoggerService} from "../logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import 'reflect-metadata';
import {IUserController} from "./users.controller.interface";

@injectable()
export class UsersController extends BaseController implements IUserController {
    constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService) {
        super(loggerService);
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
