import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { db, auth } from '../firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({channelName, channelId, chatRef }) {
    const [input, setInput] = useState('');
    const [user] = useAuthState(auth);


    const sendMessage = (e) => {
        e.preventDefault();

        if (!channelId) {
            return false;
        }
        
        db.collection('chat').doc(channelId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            name: user.displayName,
            uid: user.uid
        });

        chatRef.current.scrollIntoView({
            behavior: 'smooth',
        });
        setInput('');

    }

    return (
        <ChatInputContainer>
            <form>
                <input 
                    value={input} 
                    onChange={ (e) => setInput(e.target.value)}
                    placeholder='Type a message'
                    />
                <Button className='button' hidden type='submit' onClick={sendMessage}>
                    Send
                </Button>
            </form>

        </ChatInputContainer>
    )
}
export default ChatInput;


const ChatInputContainer = styled.div`

> form {
    position: relative;
    display: flex;
    justify-content: center;
}

> form > input {
    position: fixed;
    bottom: 13px;
    width: 45%;
    border: none;
    border-radius: 5px;
    padding: 10px 15px 15px;
    font-size: 15px;
    background-color: #2a3942;
    outline: none;
    color: white;
    }

    > form > button {
        display: none !important;
    }

`;
