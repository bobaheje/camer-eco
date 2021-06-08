import { Router } from 'express';
import { AuthController } from '../controllers/api/v1/auth.controller';
import { catchError } from '../middleware/error';


const apiAuthRouter=Router();

apiAuthRouter.post('/api/v1/login', catchError(AuthController.login));
apiAuthRouter.get('/api/v1/confirm/:confirmationCode', catchError(AuthController.verifyUser));

export{apiAuthRouter};
