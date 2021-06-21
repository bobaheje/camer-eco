/* eslint-disable @typescript-eslint/ban-types */
import * as moment from 'moment';
import { Category } from './category';
import { Pays } from './pays';
import { User } from './user';

export interface Article {
  id:number;
  userId:number;
  auteur:string;
  source:string;
  title:string;
  photo:string;
  article:string;
  chapeau:string;
  countriesIdpays:string;
  categoriesId:number;
  hit:number;
  publicationDate:string;
  categories:Category;
  countries:Pays;
  user:User;
}
