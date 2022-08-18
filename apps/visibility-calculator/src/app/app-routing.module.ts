import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRoutePaths } from './core/types/app-routes.types';

const routes: Routes = [
	{ path: '', redirectTo: AppRoutePaths.Projects, pathMatch: 'full' },
	{
		path: AppRoutePaths.Projects,
		loadChildren: () => import('./modules/project/project.module').then((m) => m.ProjectModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
