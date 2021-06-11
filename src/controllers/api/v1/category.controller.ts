import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../../../models/category.model';


export class CategoryController{

  static findAll=async (req:Request, res:Response)=>{
    const model=getRepository(Category);
    return res.json(await model.find({
      order:{
        category:'ASC',
        createdAt:'DESC'
      }
    }));
  }

  static create=async (req:Request, res:Response)=>{
    const model=getRepository(Category);
    return res.json(await model.save(model.create(req.body)));
  }
  static findOne=async (req:Request, res:Response)=>{
    const model=getRepository(Category);
    return res.json(await model.findOne(req.params.id));
  }
  static findBySlug=async (req:Request, res:Response)=>{
    const model=getRepository(Category);
    return res.json(await model.findOne(req.params.slugcategory));
  }
  static update=async (req:Request, res:Response)=>{
    const model=getRepository(Category);
    const categoryToUpdate=await model.findOne(req.params.id);
    if(categoryToUpdate){
      model.merge(categoryToUpdate, req.body);
      
      return res.json(await model.save(categoryToUpdate));
    }
    return res.json({'message':'Category not found'});
  }

  static delete=async (req:Request, res:Response)=>{
    const model=getRepository(Category);
    return res.json(await model.delete(req.params.id));
  }
}