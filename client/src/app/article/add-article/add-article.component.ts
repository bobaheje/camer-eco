/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-invalid-this */
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Article } from 'src/app/models/article';
import { Category } from 'src/app/models/category';
import { Pays } from 'src/app/models/pays';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  @Input() article:Article|any
  @Input() countries:Pays[]=[];
  @Input() categories:Category[]=[];
  @Input() currentUserId=0;
  
  //category:Category|any;
  constructor(private articleService:ArticleService, private authService:AuthService) { 
    this.currentUserId=parseInt(authService.getUserId());
    
  }

  
  addArticle=(art:Article)=>{
    // eslint-disable-next-line no-invalid-this
    
    
    art.publicationDate=moment(art.publicationDate).format('YYYY-MM-DD HH:mm:ss');
    // console.log(art.publicationDate);
    // console.log(art);

    // console.log(art.pulicationDate);
    this.articleService.createArticle(art)
        .subscribe(data=>{
          this.article=data;
        });

  }
  getCountries=()=>{
    return this.articleService.getCountries();
  }
  getCategories=()=>{
    return this.articleService.getcategories();
  }

  getUserId=()=>{
    
    return this.currentUserId;
  }

  ngOnInit(): void {
   
    this.getCountries().subscribe(data=>{
      this.countries=data;
    });
    this.getCategories().subscribe(data=>{
      this.categories=data;
    });
    
    
  }

}
