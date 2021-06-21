import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { AddArticleComponent } from './article/add-article/add-article.component';
import { CategoryService } from './services/category.service';
import { ArticleService } from './services/article.service';
import { AuthService } from './services/auth.service';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EditorModule } from '@tinymce/tinymce-angular';

export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD HH:mm:ss',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};

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
    DeleteCategoryComponent,
    AddArticleComponent
  ],
  imports: [
    MatInputModule, 
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    EditorModule
   
    
  ],
  providers: [
    LoginService,
    CategoryService,
    ArticleService,
    AuthService,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
