import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './category/category.component';
import { UserComponent } from './user/user.component';

const routes:Routes=[
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {
        path:'article',
        component:ArticleComponent
      },
      {
        path:'category',
        component:CategoryComponent
      },
      {
        path:'user',
        component:UserComponent
      }
    ]
  },
  {
    path:'login',
    component:LoginComponent
    
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
