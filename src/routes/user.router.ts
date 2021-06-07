import { Router } from 'express';
import { UserController } from '../controllers/api/v1/user.controller';
import { catchError } from '../middleware/error';


const apiUserRouter=Router();

apiUserRouter.get('/api/v1/users', catchError(UserController.findAll));
apiUserRouter.post('/api/v1/users', catchError(UserController.create));
apiUserRouter.get('/api/v1/users/:id', catchError(UserController.findOne));
apiUserRouter.put('/api/v1/users/:id', catchError(UserController.update));
apiUserRouter.delete('/api/v1/users/:id', catchError(UserController.delete));
apiUserRouter.get('/api/v1/test', UserController.bigTest);

export {apiUserRouter};