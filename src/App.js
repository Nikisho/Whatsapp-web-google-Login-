import React from 'react';
import styled from '@emotion/styled';
import Header from './components/Header'
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';
import './App.css';
import Spinner from 'react-spinkit';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
             src="https://cdn.pixabay.com/photo/2022/02/08/09/15/smartphone-7001038_1280.png"
             alt=""
          />
          <Spinner 
             name="ball-grid-pulse" 
             fadeIn='none'
          />
        </AppLoadingContents>
      </AppLoading>
    )
  } 
  return (
    <div className="App">
      <Router>
      {!user ? (
          <Login />
        ) : (
      <>
      <Header />
      <AppBody>
        <Sidebar />
          <Switch>
            <Route path="/">
                <Chat />
            </Route>
          </Switch>
        </AppBody>
      </>
        )}
    </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column
  justify-content: center;
  align-items: center;

  >img {
    padding: 20px;
    height: 200px;
    margin-bottom: 40px;
  }
`;
const AppBody = styled.div`
  display: flex;
  height: 100vh;
  overflow-x: hidden;
`;