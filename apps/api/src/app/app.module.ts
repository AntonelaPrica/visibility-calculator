import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5434,
			username: 'visibilityuser',
			password: 'visibilitypass',
			database: 'visibilitydb',
			entities: [],
			synchronize: true,
			autoLoadEntities: true,
		}),
		UsersModule,
		AuthModule,
		ProjectsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
