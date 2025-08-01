import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@/config/config.module';
import configuration from '@/config/configuration';
import { UserModule } from '@/modules/users/user.module';
import { RoleModule } from '@/modules/roles/role.module';
import { FileModule } from '@/modules/files/file.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(configuration().getTypeOrmConfig()),
    UserModule,
    RoleModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
