


import React from 'react'
import { Button, Header, Left, Right, Icon, Body, Title, StyleSheet, Text, Image, View, Alert } from 'react-native'
// import { Button, Header, Left, Right, Icon, Body, Title, Thumbnail } from 'native-base'
// import { connect } from 'react-redux'

// import { createUser } from '../actions/AuthAction'
import Input from '../../dummyComponents/input'
import Buttons from '../../dummyComponents/Buttons'
import { withNavigation } from 'react-navigation';


class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '', confirmedPassword: '', signIn: null }
    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
   componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ signIn: global._isSignIn })
        });
    }
    handleSignUp = () => {
        if (this.state.password !== this.state.confirmedPassword) {
            Alert.alert('Passwords do not match')

            return
        }
        if (this.state.password.length < 8 ) {
            Alert.alert('Password needs more than 8 characters')
            return
        }
        if (!this.validateEmail(this.state.email)) {
            Alert.alert('Email Is Not Correct')
            return
        }
        console.log(uri)
        fetch(`http://${global._ipAddress}:3000/user/checkEmail/${this.state.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {

                console.log("+++++++++++++++++");
                console.log(responseJson);
                if (responseJson.res === "Yes"){
                    Alert.alert('Email Already Existed')
                    return
                }else {
                    fetch(`http://${global._ipAddress}:3000/user/createUser`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: this.state.email, password: this.state.password }),
                    })
                        .then(response => {
                            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                            Alert.alert('Success','Sign Up Succeed',[
                                { text: 'OK', onPress: () => this.props.navigation.navigate('SignIn') }  ])
                        })
                        .catch(error => {
                            console.error(error)
                        })
                }
            })
            .catch((error) => {
                // console.error(error);
            });
        console.log('11111')

        console.log('22222')


  
        // this.props.dispatchCreateUser(this.state.email, this.state.password)

        // setTimeout(() => {
        //     if (!this.props.auth.signUpError) {
        //         this.props.navigation.navigate('SignIn')
        //     }
        // }, 1300)

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

    handleLogOut = () => {
      global._isSignIn = false
      global._email = null
      this.setState({ signIn: false })
    }
    render() {
        // const {
        //     auth: { isAuthenticating, signUpError, signUpErrorMessage },
        // } = this.props
      if (this.state.signIn) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Buttons title="Sign Out" onPress={this.handleLogOut} />
        </View>;
      } else {
        return (
            <View style={{ flex: 1 }}>

                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Image
                            source={require('../../images/boomboxcropped.png')}
                            style={styles.headingImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.greeting}>Welcome,</Text>
                    <Text style={styles.greeting2}>sign up to continue</Text>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="Email"
                            onChangeText={email =>
                                this.setState({
                                    email,
                                })
                            }
                            value={this.state.email}
                        />
                        <Input
                            placeholder="Password"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            secureTextEntry
                        />
                        <Input
                            placeholder="Confirmed Password"
                            onChangeText={confirmedPassword => this.setState({ confirmedPassword })}
                            value={this.state.confirmedPassword}
                            secureTextEntry
                        />
                    </View>
                    <Buttons title="Sign Up" onPress={this.handleSignUp}  />

                    {/* <Text style={[styles.errorMessage, signUpError && { color: 'orange' }]}>
                        Error logging in. Please try again.
          </Text>
                    <Text style={[styles.errorMessage, signUpError && { color: 'orange' }]}>
                        {signUpErrorMessage}
                    </Text> */}
                </View>
            </View>
        )
       }
    }
}

export default withNavigation(SignUp);

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
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
    errorMessage: {
        fontFamily: 'Arial',
        fontSize: 12,
        marginTop: 10,
        color: 'transparent',
    },
    heading: {
        flexDirection: 'row',
    },
    headingImage: {
        width: 38,
        height: 38,
    },
})
