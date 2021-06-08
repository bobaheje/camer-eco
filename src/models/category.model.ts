/* eslint-disable no-console */
import slugify from 'slugify';
import { titleCase } from 'title-case';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Article } from './article.model';
import { BaseModel } from './base.model';



@Entity()
export class Category extends BaseModel{
  
  @Column('varchar', {
    length:100,
    nullable:false
  })
  category?:string;

  @Column('varchar', {
    length:150,
    unique:true
  })
  public slugcategory?:string;
 
  public country?:string;

  @OneToMany(() => Article, article => article.categories)
  articles?: Article[];
  

  @BeforeInsert()
  @BeforeUpdate()
  slugifyArticle(){
    this.slugcategory=slugify(this.category||'', {lower:true});
    this.category=titleCase(this.category||'');
  }

}