import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Article } from './article.model';

@Entity()
export class Pays{
  @PrimaryColumn('varchar', {
    length:2
    
  })
  public idpays!:string;

  @Column('varchar', {
    length:100
  })
  public pays?:string;

  @Column('varchar', {
    length:100
  })
  public country?:string;

  @OneToMany(() => Article, article => article.countries)
  articles?: Article[];

}