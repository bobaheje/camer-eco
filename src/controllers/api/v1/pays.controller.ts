import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Pays } from '../../../models/country.model';


export class PaysController{

  static findAll=async (req:Request, res:Response)=>{
    const model=getRepository(Pays);
    return res.json(await model.find({
      order:{
        pays:'ASC',
        country:'ASC'
      }
    }));
  }

  static create=async (req:Request, res:Response)=>{
    const model=getRepository(Pays);
    return res.json(await model.save(model.create(req.body)));
  }
  static findOne=async (req:Request, res:Response)=>{
    const model=getRepository(Pays);
    return res.json(await model.findOne(req.params.id));
  }
  static update=async (req:Request, res:Response)=>{
    const model=getRepository(Pays);
    const PaysToUpdate=await model.findOne(req.params.id);
    if(PaysToUpdate){
      model.merge(PaysToUpdate, req.body);
      
      return res.json(await model.save(PaysToUpdate));
    }
    return res.json({'message':'Pays not found'});
  }

  static delete=async (req:Request, res:Response)=>{
    const model=getRepository(Pays);
    return res.json(await model.delete(req.params.id));
  }
}