import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './category/category.component';
import { UserComponent } from './user/user.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CategoryAddEditComponent } from './category/category-add-edit/category-add-edit.component';
import { UserAddEditComponent } from './user/user-add-edit/user-add-edit.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { AuthGardService } from './services/auth-gard.service';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { AddArticleComponent } from './article/add-article/add-article.component';

const routes:Routes=[
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGardService],
    children:
    [
      {
        path:'article',
        component:ArticleComponent,
        canActivate:[AuthGardService],
        children:
        [
          {
            path:'addarticle',
            component:AddArticleComponent,
            canActivate:[AuthGardService]
          }
        ]
      },
      {
        path:'category',
        component:CategoryComponent,
        canActivate:[AuthGardService],
        children:
        [
          {
            path :'deletecategory/:id',
            component:DeleteCategoryComponent,
            canActivate:[AuthGardService]
          },
          {
            path :'editcategory/:id',
            component:CategoryDetailComponent,
            canActivate:[AuthGardService]
          },
          {
            path :'addcategory',
            component:CategoryAddEditComponent,
            canActivate:[AuthGardService]
          }
        
        ]
      },
      {
        path:'user',
        component:UserComponent,
        canActivate:[AuthGardService],
          children:
          [
            {
              path :'edituser',
              component:UserDetailComponent,
              canActivate:[AuthGardService]
            },
            {
              path :'adduser',
              component:UserAddEditComponent,
              canActivate:[AuthGardService]
            }
          ]
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
