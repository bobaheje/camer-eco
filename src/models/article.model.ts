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
 
  @ManyToOne(()=>User, (user)=>user.id, {
    nullable:false
  })
  public user?:User;

  @ManyToOne(()=>Pays, (pays)=>pays.idpays, {
    nullable:false
  })
  public countries?:Pays;
  

  @BeforeInsert()
  @BeforeUpdate()
  slugifyArticle(){
    this.slugarticle=slugify(this.title||'', {lower:true});
  }

}