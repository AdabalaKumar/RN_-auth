import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './Common/Index';

class LoginForm extends Component {
    state = { email: '', password: '', errorMessage: '', loading: false };
    
     onButtonPress() {
         const { email, password } = this.state;
         this.setState({ errorMessage: '', loading: true });
           firebase.auth().signInWithEmailAndPassword(email, password)
           .then(this.onLoginSuccess.bind(this))
           .catch(() => {
               firebase.auth().createUserWithEmailAndPassword(email, password)
               .then(this.onLoginSuccess.bind(this))
               .catch(this.onLoginFail.bind(this));
           });
     }
     onLoginSuccess() {
        this.setState({ email: '', password: '', errorMessage: '', loading: false });
     }
     onLoginFail() {
        this.setState({ errorMessage: 'failed', loading: false });
     }
    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
            Log in
           </Button>
        );
    }
    render() {
        return (
            <Card>
                <CardSection>
                   <Input label="Email" placeholder="user@email.com" value={this.state.email} onChangeText={email => this.setState({ email })} />
                  
                </CardSection>   
                <CardSection>
                    <Input label="Password" placeholder="password" value={this.state.password} onChangeText={password => this.setState({ password })} secureTextEntry /> 
                </CardSection>   
                <Text style={styles.errorStyle}>{this.state.errorMessage}</Text>
                <CardSection>    
                  {this.renderButton()}
               </CardSection>
            </Card>
        ); 
    }
}
const styles = {
   errorStyle: {
       fontSize: 20,
       color: 'red',
       alignSelf: 'center'
   }
};
export default LoginForm;
