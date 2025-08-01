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
  constructor(private readonly rolesService: RoleService) {}

  @Get()
  @Permissions(PERMISSION.VIEW_ROLE)
  findAll() {
    return this.rolesService.findAll();
  }

  @Post()
  @Permissions(PERMISSION.CREATE_ROLE)
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }
}
