import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: '$value is invalid' })
	email: string;
	@IsString({ message: 'Password is not pass' })
	password: string;
	@IsString({ message: 'Name is not pass' })
	name: string;
}
