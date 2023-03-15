import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/database.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
})
export class AppModule {}
