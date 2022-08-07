import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectRouteId, ProjectRoutesTypes } from './types/project-routes.types';
import { ProjectLandingPageComponent } from './pages/project-landing-page.component';
import { ProjectCreatePageComponent } from './pages/project-create-page.component';
import { ProjectViewPageComponent } from './pages/project-view-page.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: ProjectRoutesTypes.LandingPage,
		pathMatch: 'full',
	},
	{
		path: ProjectRoutesTypes.LandingPage,
		component: ProjectLandingPageComponent,
		canActivate: [],
	},
	{
		path: ProjectRoutesTypes.Create,
		component: ProjectCreatePageComponent,
		canActivate: [],
	},
	{
		path: `${ProjectRoutesTypes.View}/:${ProjectRouteId}`,
		component: ProjectViewPageComponent,
		canActivate: [],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProjectRoutingModule {}
