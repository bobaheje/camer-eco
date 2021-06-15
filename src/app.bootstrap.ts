import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { ErrorMiddleware } from './middleware/error';
import { apiArticleRouter } from './routes/article.router';
import { apiAuthRouter } from './routes/auth.router';
import { apiCategoryRouter } from './routes/category.router';
import { apiPaysRouter } from './routes/pays.router';
import { apiUserRouter } from './routes/user.router';



const app=express();
app.use(cors());
app.use(urlencoded({extended:true}));
app.use(json());

//router
app.use(apiAuthRouter);
app.use(apiUserRouter);
app.use(apiArticleRouter);
app.use(apiCategoryRouter);
app.use(apiPaysRouter);
//not found
app.use(ErrorMiddleware.appError);
app.use(ErrorMiddleware.notFound);
//static files
app.use(express.static(`${process.cwd()}/public`));

export {app};