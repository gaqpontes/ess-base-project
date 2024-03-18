import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "./mediaexchange.module.css";
import { FaPaperPlane, FaUser } from 'react-icons/fa';

const prefix = "http://localhost:5001/api";

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState('');
  const [conversation, setConversation] = useState<any[]>([]);
  const { sender } = useParams();
  const { receiver } = useParams();

  const sendMessage = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * 1000000);
      setCustomName(randomNumber.toString());

      const formData = new FormData();
      formData.append('message', message);
      
      if (file) {
        const fileExtension = file.name.split('.').pop();
        const name = customName + `.${fileExtension}`;

        formData.append('customName', customName);
        formData.append('file', file);

        await axios.post(`${prefix}/messages/upload/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        const response = await axios.post(`${prefix}/messages/send/${sender}/${receiver}/upload/${name}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(response.data);
      } else {
        const dataToSend = {
          message: message
        };
  
        const response = await axios.post(`${prefix}/messages/send/${sender}/${receiver}/`, dataToSend);
        console.log(response.data.data);
      }

      const updatedConversationResponse = await axios.get(`${prefix}/messages/get/${sender}/${receiver}`);
      setConversation(updatedConversationResponse.data.data);

      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get(`${prefix}/messages/get/${sender}/${receiver}`);
        if (Array.isArray(response.data.data)) {
          setConversation(response.data.data);
        } else {
          console.error('Conversation data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    fetchConversation();
  }, [sender, receiver, conversation]);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [visibleMessages, setVisibleMessages] = useState(() => {
    const saved = localStorage.getItem('visibleMessages');
    return saved ? JSON.parse(saved) : {};
 });

 useEffect(() => {
    localStorage.setItem('visibleMessages', JSON.stringify(visibleMessages));
 }, [visibleMessages]);

  const handleDownloadClick = (messageId) => {
     setVisibleMessages(prevState => ({
       ...prevState,
       [messageId]: true,
     }));
  };

  const getMediaType = (content) => {
    if (content.startsWith('data:image/')) {
       return 'image';
    }
    if (content.startsWith('data:audio/')) {
       return 'audio';
    }
    if (content.startsWith('data:application/pdf')) {
       return 'pdf';
    }
    if (content.startsWith('data:video/')) {
       return 'video';
    }
    return 'unknown';
   };

  return (
    <div className={styles.container}>
      <div className={styles.receiver_container}>
        <FaUser style={{ marginRight: '10px' }} />
        {receiver} {}
      </div>
      <div className={styles.messages_container}>
        {conversation.map((message, index) => (
          <div key={index} className={`${styles.message} ${message.sender === sender ? styles.sender : styles.receiver}`}>
            {message.media ? (
              <>
              {message.media && message.receiver === sender && !visibleMessages[message.id]}
              {message.media && (message.receiver === sender ? visibleMessages[message.id] : true) && (
                <>
                  {getMediaType(message.content) === 'image' && (
                    <img src={message.content} alt="Media message" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                  )}
                  {getMediaType(message.content) === 'audio' && (
                    <audio src={message.content} controls style={{ maxWidth: '100%', maxHeight: '300px' }}>
                    </audio>
                  )}
                  {getMediaType(message.content) === 'pdf' && (
                    <iframe src={message.content} style={{ width: '100%', height: '300px' }}></iframe>
                  )}
                  {getMediaType(message.content) === 'video' && (
                    <video src={message.content} controls style={{ maxWidth: '100%', maxHeight: '300px' }}>
                    </video>
                  )}
                </>
              )}
              {message.media && message.receiver === sender && !visibleMessages[message.id] && (
                <button onClick={() => handleDownloadClick(message.id)}>Visualizar mídia</button>
              )}
              </>
            ) : (
              message.content
            )}
          </div>
        ))}
      </div>
      <div className={styles.input_container}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
        <div className={styles.paper_plane_icon} onClick={sendMessage}>
          <FaPaperPlane style={{ cursor: 'pointer' }}/>
        </div>
      </div>
      <div className={styles.media_input_container}>
        <input data-cy="Enviar mídia" type="file" onChange={handleFileChange} />
      </div>

    </div>
  );
};

export default SendMessage;
