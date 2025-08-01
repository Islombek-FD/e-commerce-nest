import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@/config/config.module';
import configuration from '@/config/configuration';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/users/user.module';
import { RoleModule } from '@/modules/roles/role.module';
import { FileModule } from '@/modules/files/file.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(configuration().getTypeOrmConfig()),
    AuthModule,
    UserModule,
    RoleModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
