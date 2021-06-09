import { Router } from 'express';
import { AuthController } from '../controllers/api/v1/auth.controller';
import { CategoryController } from '../controllers/api/v1/category.controller';
import { catchError } from '../middleware/error';


const apiCategoryRouter=Router();

apiCategoryRouter.get('/api/v1/categories', catchError(CategoryController.findAll));
apiCategoryRouter.post('/api/v1/categories', AuthController.authorize, catchError(CategoryController.create));
apiCategoryRouter.get('/api/v1/categories/:id', AuthController.authorize, catchError(CategoryController.findOne));
apiCategoryRouter.get('/api/v1/categories/:slugcategory', AuthController.authorize, catchError(CategoryController.findBySlug));
apiCategoryRouter.put('/api/v1/categories/:id', AuthController.authorize, catchError(CategoryController.update));
apiCategoryRouter.delete('/api/v1/categories/:id', AuthController.authorize, catchError(CategoryController.delete));

export{apiCategoryRouter};
