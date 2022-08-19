import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRoutePaths } from './modules/shared/types/app-routes.types';
import { LoginPageComponent } from './core/pages/login-page/login-page.component';
import { RegisterPageComponent } from './core/pages/register-page/register-page.component';
import { AuthGuard } from './modules/shared/auth/guards/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: AppRoutePaths.Projects, pathMatch: 'full' },
	{
		path: AppRoutePaths.Projects,
		loadChildren: () => import('./modules/project/project.module').then((m) => m.ProjectModule),
		canActivate: [AuthGuard],
	},
	{
		path: AppRoutePaths.Login,
		component: LoginPageComponent,
		canActivate: [],
	},
	{
		path: AppRoutePaths.Register,
		component: RegisterPageComponent,
		canActivate: [],
	},
	{
		path: '**',
		redirectTo: AppRoutePaths.Login,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
