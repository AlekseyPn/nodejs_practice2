import {Response, Router} from "express";

export interface IBaseController {
    readonly router: Router
    created(res:Response): void;
    send<T>(res: Response, code: number, message: T): void;
    ok<T>(res: Response, code: number, message: T): void;
}
