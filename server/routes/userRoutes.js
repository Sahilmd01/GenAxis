// routes/userRoutes.js
import express from 'express';
import userController from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const userRouter = express.Router();

userRouter.get('/creations', auth, userController.getUserCreations);
userRouter.get('/creations/published', auth, userController.getPublishedCreations);
userRouter.post('/creations/like', auth, validate({ id: { type: 'string', min: 1 } }), userController.toggleLikeCreation);

export default userRouter;