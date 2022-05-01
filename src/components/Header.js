import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { db, auth } from '../firebase';

function Header() {
    const [user] = useAuthState(auth);
    const userRef = db.collection('users');
    const addChannel = () => {
        const channelName = prompt('Enter group name');
        if (channelName){
            db.collection('chat').add({
                name: channelName,
            })
        }
    };
    const goOffLine = async() => {
        await userRef.doc(`${user.displayName}`).update({
            onlineStatus: null
        });
        auth.signOut();
    }

    window.addEventListener( "beforeunload", function() {
        goOffLine();
    });

    return(
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvatar

                onClick={goOffLine}
                 src={user?.photoURL}
                />
            </HeaderLeft>
            <HeaderRight>
                <MessageIcon onClick={ addChannel }/>
                <MoreVertIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 35%;
  min-width: 360px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: #202c33;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;
`;

const HeaderRight = styled.div`
   flex: 0.3;
   display: flex;
   align-items: center;
   margin-left: 20px;

   > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
    height: 25px;
    width: 35px;
    cursor : pointer;
    
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor : pointer;
    :hover {
        opacity: 0.8;
    }
`;