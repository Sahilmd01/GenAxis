import express from 'express'
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, reviewResume } from '../controllers/aiController.js';

import {auth} from "../middleware/auth.js"
import { upload } from '../configs/multer.js';
import { requireAuth } from '@clerk/express';

const aiRouter=express.Router();

console.log("h1")
aiRouter.post('/generate-article',auth, generateArticle);
aiRouter.post('/generate-blog-title',auth, generateBlogTitle);
aiRouter.post('/generate-image',auth, generateImage);

aiRouter.post('/remove-image-background',upload.single('image'),auth, removeImageBackground);

aiRouter.post('/remove-image-object',upload.single('image'),auth, removeImageObject);

aiRouter.post('/resume-review',upload.single('resume'),auth, reviewResume);



export default aiRouter;