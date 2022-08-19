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
import { NavbarContainerComponent } from './core/containers/navbar-container/navbar-container.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './modules/shared/auth/interceptors/auth.interceptor';
import { LoadingOverlayContainerComponent } from './core/containers/loading-overlay-container/loading-overlay-container.component';

@NgModule({
	declarations: [
		AppComponent,
		LoadingOverlayContainerComponent,
		LoginFormContainerComponent,
		RegisterFormContainerComponent,
		LoginPageComponent,
		RegisterPageComponent,
		NavbarContainerComponent,
	],
	imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, SharedModule, AppRoutingModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
