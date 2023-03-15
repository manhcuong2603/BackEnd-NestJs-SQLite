import { IsEmail, IsString, IsOptional, } from 'class-validator';

export class UpdateUserDto {

    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    password: string;
}