import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LinksEntity } from "src/Entities/links.entity";
import { UserEntity } from "src/Entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '<database host>',
      port: 5432,
      username: '<database username>',
      password: '<database pwd>',
      database: '<database name>',
      entities: [], // DB ENTITIES
      synchronize: true // MAKE IT FALSE FOR PROD SETUP
    })
  ]
})
export class DatabaseModule {}