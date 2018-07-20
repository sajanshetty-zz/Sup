import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { TopNavigationComponent } from './components/dashboard/top-navigation/top-navigation.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { AddUserComponent } from './components/users/add-user.component';
import { AddProductComponent } from './components/products/add-product.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'dashboard', component: DashboardComponent,
		children: [
			{ path: '', component: HomeComponent },
			{ path: 'users', component: UsersComponent },
			{ path: 'users/add', component: AddUserComponent },
			{ path: 'users/edit/:userId', component: AddUserComponent },
			{ path: 'products', component: ProductsComponent },
			{ path: 'products/add', component: AddProductComponent },
			{ path: 'products/edit/:productId', component: AddProductComponent },
		]
	},
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		PageNotFoundComponent,
		LoginComponent,
		DashboardComponent,
		SidebarComponent,
		TopNavigationComponent,
		HomeComponent,
		UsersComponent,
		ProductsComponent,
		AddUserComponent,
		AddProductComponent,
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule, // Animations Module
		ToastrModule.forRoot(), // Toastr Module
		RouterModule.forRoot(appRoutes),
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }
