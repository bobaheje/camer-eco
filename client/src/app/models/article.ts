import * as moment from 'moment';

export interface Article {
  userId:number;
  auteur:string;
  source:string;
  title:string;
  photo:string;
  article:string;
  chapeau:string;
  useuserId:number;
  countriesIdpays:string;
  categoriesId:number;
  hit:number;
  publicationDate:string;
}
