import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
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
          const enteredPassword:string=user.password;
          console.log(user);
          const isAuthenticated=bcrypt.compareSync(password, enteredPassword );
          console.log(`${enteredPassword} Après`);
          if(! isAuthenticated) {return res.status(404).json({'message':'Bad Credentials'});}
          const generatedToken=jwt.sign({
            exp:Math.floor(Date.now()/1000)+(60*30),
            data:{'name':`${user.nom} ${user.prenom}`}
          }, process.env.JWT_SECRET||'');
          console.log(generatedToken|| 'est OK');
          return res.json(generatedToken);
        }
    }
    catch(e){
      res.json({'message':e});
    }
    
  }

  static authorize=async (req:Request, res:Response, next:NextFunction)=>{
    const Token=req.headers.authorization?.split(' ')[1];
    try{
      
      const {data} =await jwt.verify(Token||'', process.env.JWT_SECRET||'1');
      next();

    }
    catch(e){
      next(e);
    }
  }
}