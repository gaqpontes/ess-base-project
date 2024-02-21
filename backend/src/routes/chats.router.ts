import express, { Request, Response } from 'express';
import * as chatsService from '../services/chats.service';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    try {
        const novaConversa = req.body;
        const conversas = chatsService.addChat(novaConversa); // Usando addChats do serviço
        res.json(conversas);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao adicionar conversa: ' + (error as Error).message });
    }
});

router.get('/', (req: Request, res: Response) => {
    try {
        const conversas = chatsService.getChats(); // Usando getChats do serviço
        res.json(conversas);
    } catch (error: any) {
        res.status(500).json({ message: '(router) Erro ao obter conversas: ' + (error as Error).message });
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const deletedChat = chatsService.deleteChat(id);
        res.json(deletedChat);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao excluir conversa: ' + (error as Error).message });
    }
});

router.get('/search', (req: Request, res: Response) => {
    const keyword: string = req.query.keyword as string; // Extrair a palavra-chave da consulta
    try {
        const chats = chatsService.searchChats(keyword);
        res.json(chats);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao buscar conversas: ' + (error as Error).message });
    }
});

// Rota para fixar uma conversa
router.put('/:id/fix', (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        chatsService.fixConversation(id);
        res.json({ message: 'Conversa fixada com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao fixar a conversa: ' + (error as Error).message });
    }
});

// Rota para desafixar uma conversa
router.put('/:id/unfix', (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        chatsService.unfixConversation(id);
        res.json({ message: 'Conversa desafixada com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao desafixar a conversa: ' + (error as Error).message });
    }
});

export default router; // Exportação padrão do router
