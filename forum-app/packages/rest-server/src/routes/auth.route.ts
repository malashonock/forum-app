import express from 'express';

import AuthController from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);
router.get('/login', AuthController.checkLogin);
router.post('/logout', AuthController.logout);

export default router;
