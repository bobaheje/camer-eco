import { NextFunction, Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../../../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export class AuthController{

  static login=async (req:Request, res:Response, next:NextFunction)=>{
    const model=getRepository(User);
    const {email, password}=req.body;
    try {
        
        const user=await model.findOne({email});
        
        if(!user) {return res.status(401).json({'message':'User not found'});}
        if(user){
          
          const isAuthenticated=bcrypt.compareSync(password, user.password );
          
          if(! isAuthenticated) {return res.status(404).json({'message':'Bad Credentials'});}
          const generatedToken=`${jwt.sign({
            exp:Math.floor(Date.now()/1000)+(60*30),
            data:{'name':`${user.nom} ${user.prenom}`}
          }, process.env.JWT_SECRET||'1')}`;
          
          return res.json(generatedToken);
        }
    }
    catch(e){
      res.json({'message':e});
    }
    
  }

  static authorize= (req:Request, res:Response, next:NextFunction)=>{
    //const Token=req.headers.authorization?.split(' ')[1];
    const Token=req.headers.authorization;
    
    try{
      
      jwt.verify(Token, process.env.JWT_SECRET);
      console.log('after');
      next();

    }
    catch(e){
      console.log(e);
      next(e);
    }
  }

  static verifyUser=async (req:Request, res:Response, next:NextFunction)=>{
    const model=getRepository(User);
    const userToVerify=model.find({confirmationCode: req.params.confirmationCode});
    if(!userToVerify) {return res.status(404).json({'message':'User not found'});};
    if(userToVerify){
      
      return res.json(await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ isActive: true, confirmationCode: null })
        .where('confirmationCode = :confirmationCode', {confirmationCode: req.params.confirmationCode })
        .execute());
    
    }
    
  }
}