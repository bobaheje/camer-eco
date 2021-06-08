import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../../models/user.model';
import nodemailer from 'nodemailer';




class UserController{
 
   
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
    const newUser=await model.save(model.create(req.body));

    if(newUser)
    {
      UserController.sendConfirmationEmail(`${newUser.nom} ${newUser.prenom}`, newUser.email, newUser.confirmationCode);
      return res.json(newUser);
    }
    
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

  private static sendConfirmationEmail=(name:string, email:string, confirmationCode:string)=>{
    const transport=nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    });

    transport.sendMail({
      from:'user',
      to:email,
      subject:'Please confirm your account',
      html:`<h1>Email Confirmation</h1>
      <h2>Hello ${name}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=http://localhost:3000/api/v1/confirm/${confirmationCode}> Click here</a>
      `
    }).catch(err => console.log(err));
  }

};

export {UserController};