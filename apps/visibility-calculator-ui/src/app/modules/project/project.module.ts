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
import { ProjectVisibilityTabComponent } from './containers/project-view-container/project-visibility-tab/project-visibility-tab.component';
import { ProjectViewContainerComponent } from './containers/project-view-container/project-view-container.component';
import { ProjectClassificationTreeStructureComponent } from './containers/project-create-container/project-verify-structure/project-classification-tree-structure/project-classification-tree-structure.component';
import { MatTreeSelectInputModule } from 'mat-tree-select-input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProjectGraphTabComponent } from './containers/project-view-container/project-graph-tab/project-graph-tab.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { GraphContainerComponent } from './containers/graph-container/graph-container.component';

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
		ProjectGraphTabComponent,
		ProjectVisibilityTabComponent,
		ProjectViewContainerComponent,
		ProjectClassificationTreeStructureComponent,
		GraphContainerComponent,
	],
	imports: [
		SharedModule,
		ProjectRoutingModule,
		MatTreeSelectInputModule,
		MatSidenavModule,
		MatExpansionModule,
		MatTableModule,
	],
	providers: [],
	exports: [],
})
export class ProjectModule {}
