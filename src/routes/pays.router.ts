import { Router } from 'express';
import { AuthController } from '../controllers/api/v1/auth.controller';
import { PaysController } from '../controllers/api/v1/pays.controller';
import { catchError } from '../middleware/error';


const apiPaysRouter=Router();

apiPaysRouter.get('/api/v1/pays', AuthController.authorize, catchError(PaysController.findAll));
apiPaysRouter.post('/api/v1/pays', AuthController.authorize, catchError(PaysController.create));
apiPaysRouter.get('/api/v1/pays/:id', AuthController.authorize, catchError(PaysController.findOne));
apiPaysRouter.put('/api/v1/pays/:id', AuthController.authorize, catchError(PaysController.update));
apiPaysRouter.delete('/api/v1/pays/:id', AuthController.authorize, catchError(PaysController.delete));

export{apiPaysRouter};
