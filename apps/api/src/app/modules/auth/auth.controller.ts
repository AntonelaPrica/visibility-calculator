import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthFeatureName, AuthFeatureSwaggerName } from './auth.config';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDto } from '../users/dtos/user.dto';
import { UserAccessTokenDto, UserLoginDto, UserRegisterDto } from '../users/dtos/user-access.types';

@ApiBearerAuth()
@ApiTags(AuthFeatureSwaggerName)
@Controller(AuthFeatureName)
export class AuthController {
	constructor(private authService: AuthService, private usersService: UsersService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	@ApiOkResponse({
		description: 'The JWT access token.',
		type: UserAccessTokenDto,
	})
	@ApiBadRequestResponse({
		description: 'The user provided invalid authentication credentials.',
	})
	@ApiBody({ type: UserLoginDto })
	async login(@Request() request): Promise<UserAccessTokenDto> {
		return this.authService.login(request.user);
	}

	@Post('register')
	@ApiCreatedResponse({
		description: 'The user has successfully registered.',
		type: UserDto,
	})
	async register(@Body() registerDto: UserRegisterDto): Promise<UserDto> {
		return this.usersService.registerUser(registerDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('users/me')
	@ApiOkResponse({
		description: 'The current logged in user as per JWT token.',
		type: UserDto,
	})
	@ApiUnauthorizedResponse({
		description: 'The user provided invalid authentication credentials.',
	})
	async findCurrentUser(@Request() request): Promise<UserDto> {
		return this.usersService.findOneById(request.user.userId);
	}

	@UseGuards(JwtAuthGuard)
	@Get('users/:id')
	@ApiOkResponse({
		description: 'The user as per provided id.',
		type: UserDto,
	})
	@ApiUnauthorizedResponse({
		description: 'The user provided invalid authentication credentials.',
	})
	@ApiNotFoundResponse({
		description: 'The user with the provided id was not found.',
	})
	async findOneById(@Param('id') id: string): Promise<UserDto> {
		return this.usersService.findOneById(id);
	}
}
