import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [],
	providers: [UsersService],
	exports: [UsersService, TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
