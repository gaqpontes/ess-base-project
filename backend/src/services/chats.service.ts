import fs from 'fs';
import { IChat } from '../interfaces/chat.interface';
import path from 'path';

const filePath = path.join(__dirname, '..', 'database', 'chats.json');

export const addChat = (newChat: any) => {
    try {
        let chats: IChat[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Adicionar nova conversa
        chats.push(newChat);

        // Separar chats fixadas das não fixadas
        const fixed = chats.filter(conv => conv.fixed);
        const notFixed = chats.filter(conv => !conv.fixed);

        // Ordenar chats não fixadas com base no timestamp da última mensagem (a mais recente)
        notFixed.sort((a: any, b: any) => {
            return new Date(b.messages[0].timestamp).getTime() - new Date(a.messages[0].timestamp).getTime();
        });

        // Concatenar chats fixadas e não fixadas, mantendo as fixadas no topo
        const sortedChats = [...fixed, ...notFixed];

        // Escrever os chats de volta no arquivo
        fs.writeFileSync(filePath, JSON.stringify(sortedChats));

        return sortedChats;
    } catch (error: any) {
        throw new Error('Erro ao adicionar conversa: ' + (error as Error).message);
    }
};

export const getChats = () => {
    try {
        const chats: IChat[]= JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        // Separar chats fixadas das não fixadas
        const fixed = chats.filter(conv => conv.fixed);
        const notFixed = chats.filter(conv => !conv.fixed);

        // Ordenar chats não fixadas com base no timestamp da última mensagem (a mais recente)
        notFixed.sort((a: any, b: any) => {
            return new Date(b.messages[0].timestamp).getTime() - new Date(a.messages[0].timestamp).getTime();
        });

        // Concatenar chats fixadas e não fixadas, mantendo as fixadas no topo
        const sortedChats = [...fixed, ...notFixed];

        return sortedChats;
    } catch (error: any) {
        throw new Error('(service) Erro ao obter conversas: ' + (error as Error).message);
    }
};

export const deleteChat = (id: string) => {
    try {
        let conversas: any[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const index = conversas.findIndex((conversa: any) => conversa.id === id);
        if (index !== -1) {
            const deletedChat = conversas.splice(index, 1);
            fs.writeFileSync(filePath, JSON.stringify(conversas));
            return conversas; // Retorna a lista atualizada de conversas sem a conversa excluída
        } else {
            throw new Error('Conversa não encontrada');
        }
    } catch (error: any) {
        throw new Error('Erro ao excluir conversa: ' + (error as Error).message);
    }
};

export const searchChats = (keyword: string) => {
    try {
        // Obter todas as conversas recentes
        const conversas: any[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Filtrar conversas pelo nome do contato/grupo ou pelo conteúdo da mensagem
        const conversasFiltradas = conversas.filter(conversa => {
            // Verificar se a palavra-chave está presente no nome do contato/grupo
            const nomeContatoGrupo = conversa.participants.join(' ');
            if (nomeContatoGrupo.toLowerCase().includes(keyword.toLowerCase())) {
                return true;
            }
            return false;
        });

        // Ordenar as conversas filtradas em ordem alfabética pelo nome do contato/grupo
        conversasFiltradas.sort((a, b) => a.participants.join(' ').toLowerCase().localeCompare(b.participants.join(' ').toLowerCase()));

        // Verificar se há resultados da busca
        if (conversasFiltradas.length === 0) {
            throw new Error('Nenhum resultado encontrado');
        } 
        
        return conversasFiltradas;
    } catch (error: any) {
        throw new Error('Erro ao buscar conversas: ' + (error as Error).message);
    }
}

export const fixChat = (id: string) => {
    try {
        let conversas: any[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Encontrar a conversa com o ID especificado
        const conversa = conversas.find(conv => conv.id === id);

        if (conversa) {
            // Definir o campo 'fixed' como true para fixar a conversa no topo da lista
            conversa.fixed = true;

            // Atualizar o arquivo JSON com as conversas modificadas
            fs.writeFileSync(filePath, JSON.stringify(conversas));

            return conversa;
        } else {
            throw new Error(`Conversa com o ID '${id}' não encontrada.`);
        }
    } catch (error: any) {
        throw new Error('Erro ao fixar a conversa: ' + (error as Error).message);
    }
};

export const unfixChat = (id: string) => {
    try {
        let conversas: any[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Encontrar a conversa com o ID especificado
        const conversa = conversas.find(conv => conv.id === id);

        if (conversa) {
            // Definir o campo 'fixed' como false para desafixar a conversa da lista fixada
            conversa.fixed = false;

            // Atualizar o arquivo JSON com as conversas modificadas
            fs.writeFileSync(filePath, JSON.stringify(conversas));

            return conversa;
        } else {
            throw new Error(`Conversa com o ID '${id}' não encontrada.`);
        }
    } catch (error: any) {
        throw new Error('Erro ao desafixar a conversa: ' + (error as Error).message);
    }
};

export const resetChats = () => {
    try {
        // Cria um array vazio para substituir os chats existentes
        const emptyChats: IChat[] = [];
        
        // Escreve o array vazio de volta no arquivo, limpando seu conteúdo
        fs.writeFileSync(filePath, JSON.stringify(emptyChats));

        return 'Chats resetados com sucesso.';
    } catch (error: any) {
        throw new Error('Erro ao resetar os chats: ' + (error as Error).message);
    }
};

export default {
    addChat,
    getChats,
    deleteChat,
    searchChats,
    fixChat,
    unfixChat
};