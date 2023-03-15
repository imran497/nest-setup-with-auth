
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'TestSecretKey',
      signOptions: { expiresIn: '3600s' }
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {}
