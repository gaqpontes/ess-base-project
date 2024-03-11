import { useState } from 'react';
import axios from 'axios';
import styles from "./mediaexchange.module.css";

const prefix = "http://localhost:5001/api";

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [file, setFile] = useState(null);
  const [customName, setCustomName] = useState('');

  const sendMessage = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * 1000000);
      setCustomName(randomNumber.toString());

      const formData = new FormData();
      formData.append('message', message);
      
      if (file) {
        formData.append('customName', customName);
        formData.append('file', file);
      }

      await axios.post(`${prefix}/messages/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const response = await axios.post(`${prefix}/messages/send/${sender}/${receiver}/upload/${customName}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} placeholder="Sender" />
        <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="Receiver" />
      </div>
      <div className={styles.input_container}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
      </div>
      <div className={styles.input_container}>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className={styles.button_container}>
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default SendMessage;
