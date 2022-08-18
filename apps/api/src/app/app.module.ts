import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
		ProjectsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
