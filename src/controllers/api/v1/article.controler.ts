import { Request, Response } from 'express';
import { getConnection, getConnectionManager, getRepository } from 'typeorm';
import { Article } from '../../../models/article.model';
import { Category } from '../../../models/category.model';
import { Pays } from '../../../models/country.model';
import { User } from '../../../models/user.model';

export class ArticleController{

  static findAll=async (req:Request, res:Response)=>{
    const model=getRepository(Article);
    return res.json(await model.find({
      order:{
        publicationDate:'DESC'
      }
    }));
  }

  static findByUser=async (req:Request, res:Response)=>{
    const model =getRepository(Article);
    //const user=getRepository(User).findOne(req.params.userId);
    return res.json(await model.find({
      relations:['user', 'categories', 'countries'],
      where:{
        user:{id:req.params.userId}
      },
      order: {
        publicationDate: 'DESC'
        
      }
      //where:{userId:req.params.userId}
      
    }));
    
    // return res.json(await model.find({
    //   //relations:['categories', 'countries'],
    //   where:{userId:req.params.userId},
    //   order:{publicationDate:'DESC'}
    // }));
  }

  static create=async (req:Request, res:Response)=>{
    //const model=getRepository(Article);
    const userModel=getRepository(User);
    const categoryModel=getRepository(Category);
    const paysModel=getRepository(Pays);
    
    const {userId, countriesIdpays, categoriesId}=req.body;
    const utilisateur=await userModel.findOne(userId);
    const cat=await categoryModel.findOne(parseInt(categoriesId), {relations:['articles']});
    const country=await paysModel.findOne(countriesIdpays, {relations:['articles']});
    const article=new Article();
    article.article=req.body.article;
    article.auteur=req.body.auteur;
    article.auteur=req.body.auteur;
    article.categories=cat;
    article.countries=country;
    article.photo=req.body.photo;
    article.publicationDate=req.body.publicationDate;
    article.source=req.body.source;
    article.title=req.body.title;
    article.user=utilisateur;
    
    return res.json(getConnection().manager.save(article));
    // if(utilisateur && cat && country){
    //   model.merge(utilisateur, req.body);
    //   model.merge(cat, req.body);
    //   model.merge(country, req);
    //   return res.json(await model.save(model.create(req.body)));
    // }
    
    
    // const article=model.create(req.body);
    // article;
    // return res.json(await getConnection()
    //           .createQueryBuilder()
    //           .insert()
    //           .into(Article)
    //           .values(req.body)
    //           .execute());

    //return res.json(await model.save(model.create(req.body)));
  }
  static findOne=async (req:Request, res:Response)=>{
    const model=getRepository(Article);
    return res.json(await model.findOne(req.params.id));
  }
  static findBySlug=async (req:Request, res:Response)=>{
    const model=getRepository(Article);
    return res.json(await model.findOne(req.params.slugarticle));
  }
  static update=async (req:Request, res:Response)=>{
    const model=getRepository(Article);
    const articleToUpdate=await model.findOne(req.params.id);
    if(articleToUpdate){
      model.merge(articleToUpdate, req.body);
      
      return res.json(await model.save(articleToUpdate));
    }
    return res.json({'message':'Article not found'});
  }

  static delete=async (req:Request, res:Response)=>{
    const model=getRepository(Article);
    return res.json(await model.delete(req.params.id));
  }
}