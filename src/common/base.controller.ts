import {Response, Router} from "express";
import {IControllerRoute} from "./route.interface";
import {ILoggerService} from "../logger/logger.interface";

export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: ILoggerService) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public created(res: Response) {
        return res.status(201);
    }

    public send<T>(res: Response, code: number, message: T) {
        res.contentType('application/json')
        return res.status(code).json(message);
    }

    public ok<T>(res:Response, message: T) {
        return this.send<T>(res, 200, message);
    }

    protected bindRoutes(routes: IControllerRoute[]) {
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}
