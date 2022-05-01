import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { provider, auth } from "../firebase";

function Login() {
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider);
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
               <img 
               src="https://cdn.pixabay.com/photo/2022/02/08/09/15/smartphone-7001038_1280.png"
               alt=""
               /> 
               <h1>Welcome to Chat!</h1>
               <Button onClick={signIn}>
                   Sign in with Google
               </Button>
            </LoginInnerContainer>
        </LoginContainer>
    );
}
export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px
  2px rgba(0, 0, 0, 0.24);

    >img{
        object-fit: contain;
        place-items: center;
        height: 100px;
        margin-bottom: 40px;
    }
    >Button {
        margin-top: 50px;
        text-transform: inherit !important;
        background-color: #0a8d48 !important;
        color: white;
    }

`;