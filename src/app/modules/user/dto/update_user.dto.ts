import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUSerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone?: string;
}
