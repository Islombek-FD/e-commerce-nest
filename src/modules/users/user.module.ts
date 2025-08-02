import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@/modules/roles/role.entity';
import { RoleService } from '@/modules/roles/role.service';
import { RoleRepository } from '@/modules/roles/role.repository';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, RoleService, RoleRepository],
  exports: [UserService],
})
export class UserModule {}
