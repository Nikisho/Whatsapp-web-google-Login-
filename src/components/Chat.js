import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import ChatInput from './ChatInput';
import Message from './Message';
import { selectRoomId, selectUserPhoto } from '../features/appSlice';
import { useSelector } from 'react-redux';
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from '../firebase';
import background from './background.jpeg';

function Chat() {
    const roomId = useSelector(selectRoomId);
    const targetUserPhoto = useSelector(selectUserPhoto);
    const chatRef = useRef(null);

    // const [roomDetails] = useDocument(
    //       roomId && db.collection('chat').doc(roomId));
    const [roomMessages, loading] = useCollection(
            roomId && 
            db.collection('chat')
              .doc(roomId)
              .collection('messages')
              .orderBy('timestamp', 'asc')
        );

    useEffect( () => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });

    }, [roomId, loading])

    return (
    <ChatContainer>
        {roomMessages && (
        <>
        <Header>
            <HeaderLeft>
               <HeaderAvatar 
               src={targetUserPhoto} 
               alt=''
               />
            </HeaderLeft>

            <HeaderRight>

            </HeaderRight>
        </Header>
        
        <ChatMessages>
        {roomMessages?.docs.map(doc => {
        const { message, timestamp, uid } = doc.data();
        return (
            <Message
            key={doc.id}
            message={message}
            uid={uid}
            timestamp={timestamp}
            />
            )
         })}
         <span ref={chatRef}></span>
        </ChatMessages>
        <ChatBottom>
              <ChatInput
                channelId={roomId}
                chatRef={chatRef}
              />
        </ChatBottom>
        </>
        )}
    </ChatContainer >
    )
}

export default Chat;

const ChatContainer = styled.div`
   background-image: url(${background});
   flex-grow: 1;
   min-width: 60%;
   background-color: #075E54;
   overflow-y: scroll;
`;

const ChatBottom = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    padding: 35px 0;
    width: 65%;
    bottom: 0;
    background-color: #202c33;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;
`;
const HeaderRight = styled.div``;

const Header = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    justify-content: space-between;
    padding: 10px 0;
    background-color: #202c33;
    border-left: 1px solid gray;
`;

const HeaderAvatar = styled(Avatar)`
    cursor : pointer;
    :hover {
        opacity: 0.8;
    }
`;

const ChatMessages = styled.div`
    margin-top: 50px;
    margin-bottom: 60px;
`;
