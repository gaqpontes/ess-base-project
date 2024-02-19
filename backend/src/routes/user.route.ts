
import express, { Express, Router } from 'express';
import { registerUser } from '../controllers/user.controller';

const router = Router();

// Rota para o registro de usuário
router.post('/register', registerUser);

export default router;
