import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app.routing';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { ShoppingService } from '../shopping-list/shopping.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from '../shared/loggin.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ShoppingService,
    RecipeService,
    AuthService,
    DataStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class CoreModule {

}

