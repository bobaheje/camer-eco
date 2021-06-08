import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/service.user';




class UserController{
 
  static bigTest= (req:Request, res:Response)=>{
    // eslint-disable-next-line no-invalid-this
    //const model =getRepository(User);
     return res.json({'message':'Ceci est un test'});
  }
  
  
  static findAll=async (req:Request, res:Response)=>{
    // eslint-disable-next-line no-invalid-this
    const model =getRepository(User);
     return res.json(await model.find());
  }
  static findOne=async (req:Request, res:Response)=>{
    const model =getRepository(User);
    return res.json(await model.findOne(req.params.id));
  }
  static create= async (req:Request, res:Response)=>{
    const model =getRepository(User);
    return res.json(await model.save(model.create(req.body)) );
  }

  static update= async (req:Request, res:Response)=>{
    const model =getRepository(User);
    const userToUpdate=await model.findOne(req.params.id);
    
    if(userToUpdate){
      model.merge(userToUpdate, req.body);
      return res.json( await model.save(userToUpdate));
    }
    return res.json({'mesassge':'User not found'});
  }

  static delete = async (req:Request, res:Response)=>{
    const model =getRepository(User);
    res.json(await model.delete(req.params.id));
  }

};

export {UserController};