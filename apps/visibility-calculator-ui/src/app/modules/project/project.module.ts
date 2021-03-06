import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCreatePageComponent } from './pages/project-create-page.component';
import { ProjectViewPageComponent } from './pages/project-view-page.component';
import { ProjectLandingPageComponent } from './pages/project-landing-page.component';
import { ProjectListContainerComponent } from './containers/project-list-container/project-list-container.component';
import { ProjectFormContainerComponent } from './containers/project-create-container/project-form-container.component';
import { ProjectCreateMappingsComponent } from './containers/project-create-container/project-create-mappings/project-create-mappings.component';
import { ProjectReviewComponent } from './containers/project-create-container/project-review/project-review.component';
import { ProjectUploadComponent } from './containers/project-create-container/project-upload/project-upload.component';
import { ProjectVerifyStructureComponent } from './containers/project-create-container/project-verify-structure/project-verify-structure.component';
import { ProjectDescriptionTabComponent } from './containers/project-view-container/project-description-tab/project-description-tab.component';
import { ProjectVisibilityTabComponent } from './containers/project-view-container/project-visibility-tab/project-visibility-tab.component';
import { ProjectViewContainerComponent } from './containers/project-view-container/project-view-container.component';

@NgModule({
	declarations: [
		ProjectCreatePageComponent,
		ProjectViewPageComponent,
		ProjectLandingPageComponent,
		ProjectListContainerComponent,
		ProjectFormContainerComponent,
		ProjectCreateMappingsComponent,
		ProjectReviewComponent,
		ProjectUploadComponent,
		ProjectVerifyStructureComponent,
		ProjectDescriptionTabComponent,
		ProjectVisibilityTabComponent,
		ProjectViewContainerComponent,
	],
	imports: [SharedModule, ProjectRoutingModule],
	providers: [],
	exports: [],
})
export class ProjectModule {}
