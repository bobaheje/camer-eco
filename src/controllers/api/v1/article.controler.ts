import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Article } from '../../../models/article.model';
import { Pays } from '../../../models/country.model';
import { User } from '../../../models/user.model';

export class ArticleController{

  static findAll=async (req:Request, res:Response)=>{
    const model=getRepository(Article);
    return res.json(await model.find());
  }

  static create=async (req:Request, res:Response)=>{
    const model=getRepository(Article);
      
    return res.json(await model.save(model.create(req.body)));
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