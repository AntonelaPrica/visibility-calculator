import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginFormContainerComponent } from './core/containers/login-form-container/login-form-container.component';
import { RegisterFormContainerComponent } from './core/containers/register-form-container/register-form-container.component';
import { LoginPageComponent } from './core/pages/login-page/login-page.component';
import { RegisterPageComponent } from './core/pages/register-page/register-page.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginFormContainerComponent,
		RegisterFormContainerComponent,
		LoginPageComponent,
		RegisterPageComponent,
	],
	imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
