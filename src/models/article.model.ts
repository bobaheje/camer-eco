/* eslint-disable no-console */
import slugify from 'slugify';
import { BeforeInsert, BeforeUpdate, Column, Entity, getRepository, Index, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { Category } from './category.model';
import { Pays } from './country.model';
import { User } from './user.model';
import {convert } from 'html-to-text';

@Entity()
export class Article extends BaseModel{
  
  @Column('varchar', {
    length:100,
    nullable:false
  })
  @Index()
  auteur?:string;

  @Column('varchar', {
    length:100,
    nullable:false
  })
  @Index()
  source?:string;

  @Column('varchar', {
    length:200,
    nullable:false
  })
  title?:string;

  @Column('varchar', {
    length:200,
    nullable:false
  })
  photo?:string;

  @Column('text', {
    nullable:false
  })
  article?:string;

  @Column('varchar', {
    length:200,
    nullable:false
  })
  chapeau?:string;

  @Column({
    nullable:false,
    default:0
  })
  hit?:number;

  @Column('varchar', {
    length:200,
    unique:true
  })
  public slugarticle?:string;

  @Column({
    nullable:false
  })
  public publicationDate?:Date;
 
  @ManyToOne(()=>User, (user)=>user.articles)
  public user?:User;

  @ManyToOne(()=>Pays, (pays)=>pays.articles)
  public countries?:Pays;

  @ManyToOne(()=>Category, (category)=>category.articles)
  public categories?:Category;
  

  @BeforeInsert()
  @BeforeUpdate()
  slugifyArticle(){
    this.slugarticle=slugify(this.title||'', {lower:true, replacement:'-'});
    const htmlToConvert=convert(this.article, {wordwrap: 130});
    this.chapeau=htmlToConvert.substring(0, 180);
    
  }

}