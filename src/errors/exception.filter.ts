import {NextFunction, Request, Response} from "express";
import {LoggerService} from "../logger/logger.service";
import { IExceptionFilter } from "./exception.filter.interface";
import {HttpError} from "./http-error";

export class ExceptionFilter implements IExceptionFilter {
    constructor(private logger: LoggerService) {
    }

    catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof  HttpError) {
            this.logger.error(`[${err.context}] Error ${err.statusCode}: ${err.message}`);
            return res.status(err.statusCode).send({error: err.message})
        } else {
            this.logger.error(`${err.message}`);
            return res.status(500).send({error: err.message})
        }
    }
}
