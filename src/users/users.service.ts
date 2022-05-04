import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './user.service.interface';
import { injectable } from 'inversify';

@injectable()
export class UsersService implements IUsersService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		// validate is exists and return null
		// if not exists create user
		return newUser;
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
