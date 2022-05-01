import React from 'react';
import styled from 'styled-components';
import SidebarOption from './SidebarOption';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db  } from '../firebase';
//import { AvatarGenerator } from 'random-avatar-generator';
 
function Sidebar() {
    const [userData] = useCollection(db.collection('users'));

    return(
        <SidebarContainer >
           {userData?.docs.map((doc) => (
                <SidebarOption 
                id={doc.id}
                key={doc.id}
                onlineStatus={doc.data().onlineStatus}
                uid={doc.data().uid}
                photo={doc.data().photo}
                />
           ))}
        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer = styled.div`
    background-color: #111B21;
    color: white;
    width: 35%;
    min-width: 360px;
    border-top: 3px solid #49274b;
    margin-top: 55px;
    
`;