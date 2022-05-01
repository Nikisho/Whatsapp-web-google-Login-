import React from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { db, auth } from '../firebase';
import { enterRoom } from '../features/appSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function SidebarOption({ photo, id, onlineStatus, uid}) {
    const dispatch = useDispatch();
    const userRef = db.collection('users');
    const [user] = useAuthState(auth);

    const fetchUserAttributes = async function() {
        if (user === auth.currentUser) {
                await userRef.doc(`${user.displayName}`).set({
                photo: user.photoURL,
                uid: user.uid,
                onlineStatus: 'on',
            });
        }
    }
    
    fetchUserAttributes();
    const selectChannel = () => {
        if (id) {
            dispatch(enterRoom({
                roomId: (uid + user.uid).split('').sort().join(''),
                targetUserPhoto: photo
            }))
        }
    };
    
    const onlineState = onlineStatus? 'online' : 'offline'; 
    if (id !== user.displayName) {
        return (
            <SidebarOptionContainer onClick={ selectChannel }>
                    <img src={photo}alt=''/> {' '} 
                    <h2> {id} </h2>
                <FiberManualRecordIcon className={`${onlineState}`}/>
            </SidebarOptionContainer>
        );
    }
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`

    display: flex;
    height: 80px;
    max-width: 96%;
    font-size: 20px;
    align-items: center;
    padding-left: 10px;
    cursor: pointer;
    border-top : 1px solid gray;
    border-bottom: 1px solid rgba(134,150,160,0.15);

    :hover {
        opacity: 0.6;
        background-color: #202c33;
    }

    >h2 {
        font-weight: 500;
        font-size: 20px;
        margin-left: 20px;
    }

    >img {
        height: 50px;
        border-radius: 50%;
    }

    
    & .online {
            font-size: 15px;
            margin-left: auto;
            align-items: flex-end;
            margin-right: 20px;
            color: green;
        }
    & .offline {
        font-size: 15px;
        margin-left: auto;
        align-items: flex-end;
        margin-right: 20px;
        color: red;
    }
`;