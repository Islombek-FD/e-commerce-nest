import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/users/user.module';
import { RoleModule } from '@/modules/roles/role.module';
import { FileModule } from '@/modules/files/file.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    RoleModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
