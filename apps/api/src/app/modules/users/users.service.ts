import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UnsecureUserDto } from './dtos/unsecure-user.dto';
import { isNil as _isNil } from 'lodash';
import { UserDto } from './dtos/user.dto';
import { UserRegisterDto } from './dtos/user-access.types';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>
	) {}

	async findOneByEmailUnsecure(email: string): Promise<UnsecureUserDto | null> {
		const foundUser = await this.usersRepository.findOneBy({ email });
		if (_isNil(foundUser)) {
			return null;
		}
		return new UnsecureUserDto({ ...foundUser });
	}

	async findOneById(id: string): Promise<UserDto> {
		const foundUser = await this.usersRepository.findOneBy({ id });
		if (_isNil(foundUser)) {
			Logger.error(`UsersService.findOneById could not find user with ID: ${id}`);
			throw new NotFoundException();
		}
		return new UserDto({ ...foundUser });
	}

	async findAll(): Promise<UserDto[]> {
		const foundUsers = await this.usersRepository.find();
		if (_isNil(foundUsers)) {
			return [];
		}
		return foundUsers.map((user) => new UserDto({ ...user }));
	}

	async registerUser(registerDto: UserRegisterDto): Promise<UserDto> {
		try {
			const salt = await genSalt(10);
			const hashedPassword = await hash(registerDto.password, salt);

			const userEntity = new UserEntity({ ...registerDto, password: hashedPassword });
			const savedUserEntity = await this.usersRepository.save(userEntity);

			return new UserDto({ ...savedUserEntity });
		} catch (error) {
			Logger.error(`UsersService.registerUser ${error}`);
			throw new BadRequestException('The user could not be registered.');
		}
	}
}
