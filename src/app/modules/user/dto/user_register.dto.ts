import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone?: string;
}
