import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dtos/user.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { UserAccessTokenDto } from '../users/dtos/user-access.types';
import { compare } from 'bcrypt';
import { isNil as _isNil } from 'lodash';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async validateUser(email: string, password: string): Promise<UserDto> {
		const user = await this.usersService.findOneByEmailUnsecure(email);
		if (_isNil(user)) {
			return null;
		}
		const isSamePassword = await compare(password, user.password);
		if (isSamePassword) {
			delete user.password; // take care to not share the password hash
			return new UserDto({ id: user.id, email: user.email });
		}
		return null;
	}

	async login(user: UserDto): Promise<UserAccessTokenDto> {
		const payload: Partial<JwtPayloadDto> = { username: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
