// routes/aiRoutes.js
import express from 'express';
import aiController from '../controllers/aiController.js';
import { auth } from '../middleware/auth.js';
import { imageUpload, resumeUpload } from '../configs/multer.js';
import { validate } from '../middleware/validation.js';

const aiRouter = express.Router();

// Validation schemas
const generateSchema = {
  prompt: { type: 'string', min: 1, max: 1000 },
  length: { type: 'number', min: 100, max: 2000, optional: true }
};

const imageSchema = {
  prompt: { type: 'string', min: 1, max: 500 },
  publish: { type: 'boolean', optional: true }
};

// Routes with validation
aiRouter.post('/generate-article', auth, validate(generateSchema), aiController.generateArticle);
aiRouter.post('/generate-blog-title', auth, validate({ prompt: { type: 'string', min: 1, max: 500 } }), aiController.generateBlogTitle);
aiRouter.post('/generate-image', auth, validate(imageSchema), aiController.generateImage);
aiRouter.post('/remove-image-background', auth, imageUpload, aiController.removeImageBackground);
aiRouter.post('/remove-image-object', auth, imageUpload, aiController.removeImageObject);
aiRouter.post('/resume-review', auth, resumeUpload, aiController.reviewResume);

export default aiRouter;