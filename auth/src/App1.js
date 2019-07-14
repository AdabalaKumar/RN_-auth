import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './Components/Common/Index';
import LoginForm from './Components/LoginForm';

class App1 extends Component {
    state = { LoggedIn: false };
    componentWillMount() {
        firebase.initializeApp({
                apiKey: 'AIzaSyDzwywRBTQ5QTHfxibyvd8K3mhzTN2Iwbk',
                authDomain: 'auth-b4fd2.firebaseapp.com',
                databaseURL: 'https://auth-b4fd2.firebaseio.com',
                projectId: 'auth-b4fd2',
                storageBucket: '',
                messagingSenderId: '309620015608',
                appId: '1:309620015608:web:6f301221dd255e8f'
              });

            firebase.auth().onAuthStateChanged((user) => {
                 if (user) {
                     this.setState({ LoggedIn: true });
                 } else {
                    this.setState({ LoggedIn: false });
                 }
            });
    }
    renderContent() {
         switch (this.state.LoggedIn) {
             case true:
                return (<Button onPress={() => firebase.auth().signOut()} >Login Out</Button>);
             case false:
                   return <LoginForm />;
             default:
                    return <Spinner size="large" />;
         }
    }
    render() {
        return (
            <View>
                <Header headerText={'auth'} />
               {this.renderContent()}
            </View>
        );
    }
}
export default App1;