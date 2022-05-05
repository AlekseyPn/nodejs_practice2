import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Email is invalid' })
	email: string;
	@IsString({ message: 'Password is not pass' })
	@MinLength(4, { message: 'Password length must be greater then $constraint1' })
	password: string;
}
