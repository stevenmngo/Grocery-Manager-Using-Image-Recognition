import React from 'react'
import { Button, Header, Left, Right, Icon, Body, Title, Alert, Text, View, StyleSheet, Image } from 'react-native'

import Input from './dummyComponents/input'
import Buttons from './dummyComponents/Buttons'
import IR from './IR'

export default  class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '', signIn: null }
    }

    handleLogin = () => {
        if (this.state.password.length < 8) {
            Alert.alert('Email/Password is Incorrect')
            return
        }
        if (!this.validateEmail(this.state.email)) {
            Alert.alert('Email/Password is Incorrect')
            return
        }
        console.log("dddddddddddd")
        console.log(`http://${global._ipAddress}:3000/user/checkAuth`)
        fetch(`http://${global._ipAddress}:3000/user/checkAuth`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.state.email, password: this.state.password }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                console.log("+++++++++++++++++");
                console.log(responseJson);
                if (responseJson.res === "Yes") {
                    global._isSignIn = true
                    global._email = this.state.email
                    console.log(global._isSignIn, global._email);
                    // this.props.navigation.navigate('ir')
                    this.setState({ signIn: true })
                    return <IR/>
                } else {
                    
                    Alert.alert('Email/Password is Incorrect')
                    return
                }
            })
            .catch(error => {
                console.error(error)
            })

    }
    handleLogOut = () => {
        global._isSignIn = false
        global._email = null
        this.setState({ signIn: false })

    }
    validateEmail = (text) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log("Email is Not Correct");
            return false;
        }
        else {
            // console.log("Email is Correct");
            return true;
        }
    }
    render() {
        // const {
        //     auth: { signInErrorMessage, isAuthenticating, signInError },
        // } = this.props
        if (this.state.signIn) {
            return <IR/>;
        } else {
            return (
                <View style={{ flex: 1 }}>

                    <View style={styles.container}>
                        {/* {this.state.errorMessage && <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>} */}
                        <View style={styles.heading}>
                            <Image
                                source={require('./images/shape.png')}
                                style={styles.headingImage}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[styles.greeting]}>Welcome back,</Text>
                        <Text style={[styles.greeting2]}>sign in to continue</Text>
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder="Email"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                            <Input
                                placeholder="Password"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                                secureTextEntry
                            />
                        </View>
                        <Buttons title="Sign In" onPress={this.handleLogin} />
                        {/* <Text style={[styles.errorMessage, signInError && { color: 'orange' }]}>
                        Error logging in. Please try again.
          </Text>
                    <Text style={[styles.errorMessage, signInError && { color: 'orange' }]}>
                        {signInErrorMessage}
                    </Text> */}
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
    },
    headingImage: {
        width: 38,
        height: 38,
    },
    errorMessage: {
        fontSize: 12,
        marginTop: 10,
        color: 'transparent',
        fontFamily: 'Arial',
    },

    inputContainer: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    greeting: {
        marginTop: 20,
        fontSize: 24,
        fontFamily: 'Arial',
    },
    greeting2: {
        color: '#666',
        fontSize: 24,
        marginTop: 5,
        fontFamily: 'Courier New',
    },
})
