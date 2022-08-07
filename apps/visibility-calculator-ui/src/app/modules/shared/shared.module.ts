import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCheckboxModule,
		MatChipsModule,
		MatCardModule,
		MatDividerModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatToolbarModule,
		MatTabsModule,
		MatTreeModule,
		MatStepperModule,
		MatGridListModule,
	],
	providers: [],
	exports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCheckboxModule,
		MatChipsModule,
		MatCardModule,
		MatDividerModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatToolbarModule,
		MatTabsModule,
		MatTreeModule,
		MatStepperModule,
		MatGridListModule,
	],
})
export class SharedModule {}
