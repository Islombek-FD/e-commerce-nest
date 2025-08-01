import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PERMISSION } from '@/common/enums';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { PermissionsGuard } from '@/common/guards/permission.guard';
import { Permissions } from '@/common/decorators/permission.decorator';
import { RoleService } from '@/modules/roles/role.service';
import { CreateRoleDto } from '@/modules/roles/dto/create-role.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permissions(PERMISSION.VIEW_ROLE)
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Permissions(PERMISSION.CREATE_ROLE)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }
}
