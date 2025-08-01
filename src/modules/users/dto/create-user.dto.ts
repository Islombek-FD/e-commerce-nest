import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { STATUS } from '@/common/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  middleName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsEnum(STATUS)
  @IsNotEmpty()
  status: STATUS;
}
