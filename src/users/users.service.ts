import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './user.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.IConfigService) private configService: IConfigService, @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const salt = this.configService.get('SALT');
		const newUser = new User(email, name);
		await newUser.setPassword(password, Number(salt));
		const existedUsers = await this.usersRepository.find(email);
		if (existedUsers) {
			return null;
		}

		return this.usersRepository.create(newUser);
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
