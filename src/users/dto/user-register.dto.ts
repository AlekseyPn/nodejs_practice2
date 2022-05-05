import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: '$value is invalid' })
	email: string;
	@IsString({ message: 'Password is not pass' })
	@MinLength(4, { message: 'Password length must be greater then $constraint1' })
	password: string;
	@IsString({ message: 'Name is not pass' })
	name: string;
}
