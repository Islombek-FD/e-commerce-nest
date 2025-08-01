import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { STATUS } from '@/common/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  middleName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  roleId: number;

  @IsEnum(STATUS)
  status: STATUS;
}
