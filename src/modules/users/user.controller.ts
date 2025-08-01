import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PERMISSION } from '@/common/enums';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { PermissionsGuard } from '@/common/guards/permission.guard';
import { Permissions } from '@/common/decorators/permission.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PERMISSION.VIEW_USERS)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PERMISSION.VIEW_USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PERMISSION.CREATE_USER)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PERMISSION.UPDATE_USER)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PERMISSION.DELETE_USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
