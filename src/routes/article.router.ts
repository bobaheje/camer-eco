import { Router } from 'express';
import { ArticleController } from '../controllers/api/v1/article.controler';
import { AuthController } from '../controllers/api/v1/auth.controller';
import { catchError } from '../middleware/error';


const apiArticleRouter=Router();

apiArticleRouter.get('/api/v1/articles', AuthController.authorize, catchError(ArticleController.findAll));
apiArticleRouter.post('/api/v1/articles', AuthController.authorize, catchError(ArticleController.create));
apiArticleRouter.get('/api/v1/articles/:id', AuthController.authorize, catchError(ArticleController.findOne));
apiArticleRouter.get('/api/v1/articles/:slugarticle', AuthController.authorize, catchError(ArticleController.findBySlug));
apiArticleRouter.get('/api/v1/articles/userarticle/:userId', AuthController.authorize, catchError(ArticleController.findByUser));
apiArticleRouter.put('/api/v1/articles/:id', AuthController.authorize, catchError(ArticleController.update));
apiArticleRouter.delete('/api/v1/articles/:id', AuthController.authorize, catchError(ArticleController.delete));

export{apiArticleRouter};
