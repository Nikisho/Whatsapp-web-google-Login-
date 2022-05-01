import React from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
function Message({ message, timestamp,  uid }) {
    const [user] = useAuthState(auth);
    const messageClass = uid === user.uid ? 'sent' : 'received';
    return (
        <MessageContainer>
            <MessageInfo>
                <h4 className={messageClass}>
                    <p>{message}</p>
                    <span>
                        {/* {new Date(timestamp?.toDate()).toUTCString()} */}
                    </span>
                </h4>
            </MessageInfo>
        </MessageContainer>
    )
}
export default Message;

const MessageContainer = styled.div`
  
`;
const MessageInfo = styled.div`
    >h4 {
        display: flex;
    }
    >h4 >p  {
        max-width: 300px;
        line-height: 24px;
        padding: 5px 20px;
        border-radius: 5px;
        text-align: left;
    }

    & .received >p {
        background: #e5e5ea;
        color: black;
        margin-left: 70px;
    }
    & .sent {
        flex-direction: row-reverse;
    }

    & .sent >p {
        color: white;
        background: #0b93f6;
        margin-right: 70px;
 
    }
`;