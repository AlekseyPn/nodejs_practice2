import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Connect to DB success');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(`[PrismaService] DB connection error: ${e.message}`);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
		this.logger.log('[PrismaService] Disconnect successful');
	}
}
