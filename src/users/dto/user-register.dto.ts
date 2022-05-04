import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: '$value is invalid' })
	email: string;
	@IsString({ message: 'Password is not set' })
	password: string;
	@IsString({ message: 'Name is not set' })
	name: string;
}
