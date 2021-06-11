import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './category/category.component';
import { UserComponent } from './user/user.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserAddEditComponent } from './user/user-add-edit/user-add-edit.component';
import { CategoryAddEditComponent } from './category/category-add-edit/category-add-edit.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ArticleComponent,
    CategoryComponent,
    UserComponent,
    CategoryDetailComponent,
    UserDetailComponent,
    UserAddEditComponent,
    CategoryAddEditComponent,
    DeleteCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
