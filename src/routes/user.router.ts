import { Router } from 'express';
import { AuthController } from '../controllers/api/v1/auth.controller';
import { UserController } from '../controllers/api/v1/user.controller';
import { catchError } from '../middleware/error';


const apiUserRouter=Router();

apiUserRouter.get('/api/v1/users', catchError(UserController.findAll));
apiUserRouter.post('/api/v1/users', AuthController.authorize, catchError(UserController.create));
apiUserRouter.get('/api/v1/users/:id', AuthController.authorize, catchError(UserController.findOne));
apiUserRouter.put('/api/v1/users/:id', AuthController.authorize, catchError(UserController.update));
apiUserRouter.delete('/api/v1/users/:id', AuthController.authorize, catchError(UserController.delete));


export {apiUserRouter};