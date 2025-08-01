import * as bcrypt from 'bcrypt';
import { NestFactory } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { PERMISSION, STATUS } from '@/common/enums';
import { AppModule } from '@/app.module';
import { RoleService } from '@/modules/roles/role.service';
import { UserService } from '@/modules/users/user.service';
import { CreateRoleDto } from '@/modules/roles/dto/create-role.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const roleService = app.get(RoleService);
  const userService = app.get(UserService);

  // 1. Admin role bor-yo'qligini tekshiramiz
  let adminRole = await roleService.findByName('Admin');
  if (!adminRole) {
    adminRole = await roleService.create(plainToInstance(CreateRoleDto, {
      name: 'Admin',
      permissions: Object.values(PERMISSION)
    }));
    console.log('✅ Admin roli yaratildi');
  }

  // 2. Admin user bor-yo'qligini tekshiramiz
  const adminUser = await userService.findByUsername('admin');
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('admin', 10);
    await userService.create({
      firstName: 'Admin',
      lastName: 'Admin',
      middleName: 'Admin',
      username: 'admin',
      password: hashedPassword,
      roleId: adminRole.id,
      status: STATUS.ACTIVE
    });
    console.log('✅ Admin user yaratildi');
  }

  await app.close();
}

bootstrap();
