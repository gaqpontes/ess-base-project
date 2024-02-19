import express, { Request, Response } from 'express';
import { deleteUserData } from '../controllers/delete.users.controller'; // Importe o controller

const router = express.Router();

// Rota para exclusão dos dados do usuário
router.delete('/delete', deleteUserData);

export default router;
