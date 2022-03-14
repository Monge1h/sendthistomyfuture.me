import { IsString, IsNotEmpty, IsBoolean, IsDateString, IsEmail } from 'class-validator'
export class CreateMailDto {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	mail: string;

	@IsString()
	@IsNotEmpty()
	body: string;

	@IsDateString()
	send_date: string;

	@IsBoolean()
	@IsNotEmpty()
	random_date: boolean;
}
