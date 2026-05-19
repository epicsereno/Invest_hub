import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export enum UserRoleDto {
  INVENTOR = 'INVENTOR',
  INVESTOR = 'INVESTOR',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(UserRoleDto)
  role: UserRoleDto;

  @IsOptional()
  @IsString()
  company?: string;
}

export type CreateUserRecord = Omit<CreateUserDto, 'password'> & {
  passwordHash: string;
};
