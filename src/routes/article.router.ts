import { Router } from 'express';
import { ArticleController } from '../controllers/api/v1/article.controler';
import { catchError } from '../middleware/error';


const apiArticleRouter=Router();

apiArticleRouter.get('/api/v1/articles', catchError(ArticleController.findAll));
apiArticleRouter.post('/api/v1/articles', catchError(ArticleController.create));
apiArticleRouter.get('/api/v1/articles/:id', catchError(ArticleController.findOne));
apiArticleRouter.get('/api/v1/articles/:slugarticle', catchError(ArticleController.findBySlug));
apiArticleRouter.put('/api/v1/articles/:id', catchError(ArticleController.update));
apiArticleRouter.delete('/api/v1/articles/:id', catchError(ArticleController.delete));

export{apiArticleRouter};
