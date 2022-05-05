import { User } from './user.entity';
import { UserModel } from '@prisma/client';

export interface IUsersRepository {
	create(user: User): Promise<UserModel>;
	find(email: User['email']): Promise<UserModel | null>;
}
