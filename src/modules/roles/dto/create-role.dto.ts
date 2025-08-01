import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PERMISSION } from '@/common/enums';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(PERMISSION, { each: true })
  permissions: PERMISSION[];
}
