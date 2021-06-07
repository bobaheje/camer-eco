/* eslint-disable no-console */
import slugify from 'slugify';
import { BeforeInsert, BeforeUpdate, Column, Entity, getRepository, Index, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { Pays } from './country.model';
import { User } from './user.model';


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
  chapeau?:string;

  @Column('varchar', {
    length:200,
    unique:true
  })
  public slugarticle?:string;

 
  @ManyToOne(()=>User, (user)=>user.articles, {
    nullable:false
  })
  public user?:User;

  @ManyToOne(()=>Pays, (pays)=>pays.idpays, {
    nullable:false
  })
  public countries?:Pays;
  

  @BeforeInsert()
  @BeforeUpdate()
  async slugifyArticle(){
    const {pays, country}=await getRepository('Countries').findOne(this.fkcountry);
    
    if(pays||country){
      this.slugarticle=slugify(`${pays}-${this.title}`);
      if(pays!==country)
      {
        this.slugarticle=slugify(`${pays}-${this.title}-${country}`);
      }
    }
  }
  
  
  


}