import { IsEmail } from 'class-validator';
import { titleCase } from 'title-case';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Article } from './article.model';
import { BaseModel } from './base.model';
import bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor'
  
}

@Entity()
class User extends BaseModel{
  @Column('varchar', {
    nullable:false,
    length:50
  })
  @Index()
  public nom?:string;

  @Column('varchar', {
    nullable:false,
    length:50
  })
  public prenom?:string;

  @Column('varchar', {
    nullable:false,
    length:50,
    unique:true
  })
  @IsEmail()
  public email?:string;

  @Column('varchar', {
    nullable:false,
    length:250,
    select:true
  })
  public password?:string;

  @Column('boolean', {
    default:false,
    nullable:false
  })
  public isActive?:boolean;

  @Column({
    type:'enum',
    enum:UserRole,
    default:UserRole.EDITOR
  })
  public role?:UserRole;

  @OneToMany(()=>Article, (article)=>article.user)
  public articles?:Article[];
  @BeforeInsert()
  
  passwordEncryption(){
    this.password=bcrypt.hashSync(this.password ||'', 10);
    //console.log(this.password);
  }
  @BeforeInsert()
  @BeforeUpdate()
  capitalise(){
    this.prenom=titleCase(this.prenom||'');
    this.nom=this.nom?.toUpperCase();
  }
};
export{User};