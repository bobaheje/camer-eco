/* eslint-disable no-invalid-this */
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles:Article[]=[];
  article:Article|any;
  constructor(private articleService:ArticleService) { }

  findAll=()=>{
    return this.articleService.getArticles()
                .subscribe(data=>{
                  this.articles=data;
                });
  }

  create=(article:Article)=>{
    return this.articleService.createArticle(article)
                .subscribe(data=>{
                  this.article=data;
                });
  }
  findOne=(id:number)=>{
    return this.articleService.getArticleById(id)
      .subscribe(data=>{
        this.article=data;
      });
  }

  findBySlug=(slug:string)=>{
    return this.articleService.getArticleBySlug(slug)
                .subscribe(data=>{
                  this.article=data;
                });

  }
 
  onDelete =(art:Article)=>{
    
    Swal.fire({
      title:'Deletion',
      text:`Are you sure want to remove  ${art.title} ?`,
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Yes delete it',
      cancelButtonText:'No keep it'
    })
    .then((result)=>{
      
      if(result.value){
        
        this.articleService.deleteArticle(art.userId).subscribe(()=>this.ngOnInit());
        Swal.fire(
          'Deleted',
          ` ${art.title} has been deleted`,
          'success'
        );
      }
      else if ((result.dismiss === Swal.DismissReason.cancel)){
        Swal.fire(
          'Cancelled',
          `${art.title} is safe`,
          'error'
        );
      }
    });

   
  }

  update= (id:number, article:Article)=>{
    return this.articleService.updateArticle(id, article);
  
  }

  ngOnInit(): void {
    this.findAll();
  }
  
}
