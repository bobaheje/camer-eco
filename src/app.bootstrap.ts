import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { ErrorMiddleware } from './middleware/error';
import { apiArticleRouter } from './routes/article.router';
import { apiUserRouter } from './routes/user.router';



const app=express();
app.use(cors());
app.use(urlencoded({extended:true}));
app.use(json());

//router
app.use(apiUserRouter);
app.use(apiArticleRouter);
//not found
app.use(ErrorMiddleware.appError);
app.use(ErrorMiddleware.notFound);


export {app};