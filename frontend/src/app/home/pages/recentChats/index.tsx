import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styles from './recentChats.module.css';
import pinIcon from '../assets/pin.png';
import trashIcon from '../assets/trash-can.png';
import { useNavigate } from 'react-router-dom';


interface IMessage {
    content: string;
    sender: string;
    receiver: string;
    id: string;
    media: boolean;
    timestamp: Date;
}

interface IChat {
    id: string;
    participants: string[]; 
    fixed: boolean;
    messages: IMessage[];
}

const RecentChats: React.FC = () => {
    const [chats, setChats] = useState<IChat[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [chatToDelete, setChatToDelete] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const fetchRecentChats = async (keyword?: string) => {
        try {
            let url = 'http://localhost:5001/api/chats';
            if (keyword) {
                url += `/search?keyword=${encodeURIComponent(keyword)}`;
            }
            const response = await axios.get(url);
            setErrorMessage('');
            setChats(response.data);
        } catch (error) {
            console.error('Erro ao buscar conversas:', error);
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404) {
                    setErrorMessage('Conversa não encontrada');
                }
            }   
            setChats([]);
        }
    };    
    
    useEffect(() => {
        fetchRecentChats(searchKeyword);
    }, [searchKeyword]);
    
    const formatDate = (date: Date | string | number): string => {
        // Se a data for uma string ou um número, converta-a para um objeto Date
        const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Os meses começam em 0
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
    
    const handleChatTitleClick = (sender: string, receiver: string) => {
        navigate(`/messages/${sender}/${receiver}`);
    };

    const handleDeleteChat = async (chatId: string) => {
        setChatToDelete(chatId);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        if (chatToDelete) {
            try {
                await axios.delete(`http://localhost:5001/api/chats/${chatToDelete}`);
                setShowDeleteConfirmation(false);
                setChatToDelete(null);
                fetchRecentChats();
            } catch (error) {
                console.error('Erro ao excluir conversa:', error);
            }
        }
    };
    
    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setChatToDelete(null);
    };

    const handleFixChat = async (chatId: string) => {
        try {
            const chat = chats.find(chat => chat.id === chatId) as IChat;
            if (chat.fixed) {
                await axios.put(`http://localhost:5001/api/chats/${chatId}/unfix`);
            } else {
                await axios.put(`http://localhost:5001/api/chats/${chatId}/fix`);
            }
            fetchRecentChats();
        } catch (error) {
            console.error('Erro ao fixar/desafixar a conversa:', error);
        }
    };        

    return (
        <div className={styles.container}>
            {showDeleteConfirmation && (
                <div className={styles.confirmationModalOverlay}>
                    <div className={styles.confirmationModal}>
                        <p>Tem certeza que deseja excluir essa conversa?</p>
                        <button className={styles.cancelButton} onClick={handleCancelDelete}>Cancelar</button>
                        <button className={styles.confirmButton} onClick={handleConfirmDelete} data-cy="delete-chat-confirm" >Confirmar</button>
                    </div>
                </div>
            )}
            <h2>Conversas Recentes</h2>
            <div className={styles.searchContainer}>
                {searchKeyword && (
                    <button
                        className={styles.clearSearchButton}
                        onClick={() => setSearchKeyword('')}> X </button>
                )}
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Filtrar conversas..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}/>
                {/* <button
                    className={styles.newChatButton}
                    onClick={() => setSearchKeyword('')}> Nova conversa </button> */}
            </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <ul className={styles.chatList} data-cy="chat-list">
            {chats.map((chat, index) => (
            <li key={index} className={styles.chatItem}>
                <div className={styles.chatTitleandActions}>
                    <div className={styles.chatTitle} onClick={() => handleChatTitleClick(chat.participants[0], chat.participants[1])}>{chat.participants.slice(1).join(', ')}</div>
                    <div className={styles.chatActions}>
                        <img
                            className={styles.trashIcon}
                            src={trashIcon}
                            alt='Deletar'
                            onClick={() => handleDeleteChat(chat.id)}
                            data-cy={`delete-chat-icon-${chat.participants[1]}`} />
                        <img
                            className={styles.pinIcon}
                            src={pinIcon}
                            alt='Fixar'
                            onClick={() => handleFixChat(chat.id)}
                            style={{ opacity: chat.fixed ? 1.0 : '' }} />
                    </div>
                </div>
                <div className={styles.chatItemContent}>
                    <div className={styles.chatLastMessage}> {chat.messages.slice(-1)[0].content}</div>
                    <div className={styles.chatLastMessageTimestamp}>{formatDate(chat.messages.slice(-1)[0].timestamp)}</div>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default RecentChats;
