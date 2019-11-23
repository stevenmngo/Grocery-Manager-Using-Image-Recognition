//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text,FlatList, Button } from 'react-native';
import Buttons from '../dummyComponents/Buttons'
import Loader from './Loader';
import { withNavigation } from 'react-navigation';

import { Table, Row, Rows } from 'react-native-table-component';
// import all basic components

 class Inventory extends Component {
    //Screen1 Component
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true,
            signIn: null 
             };
             
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }  
    async componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ signIn: global._isSignIn })
        });

        await fetch(`http://${global._ipAddress}:3000/item/getInventory/${global._email}`)

             .then(response => response.json())
             .then(responseJson => {
                 this.setState( {  data: responseJson.res } );
                 console.log(this.state.data)
             })
             .catch(error => {
                 console.error(error);
             });
        this.setState({ loading: false, signIn: global._email })
    }
    render() {
        if (!this.state.signIn) {
            return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Buttons title="Sign In to Continue" onPress={() => { this.props.navigation.navigate('auth') }} />
            </View>
            )

        } else if(this.state.data === null) {
              return <View style={styles.container}>
                <Loader
                    loading={this.state.loading}
                    title="Loading data" />
                </View>;
        }

        else {
        return (
            <View >

                <View style={styles.container}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={["Date", "Item", "Amount"]} style={styles.head} textStyle={styles.text} />
                        <Rows data={this.state.data.map((x) => { return [x.date, x.item, x.amount] })} style={styles.head} textStyle={styles.text} />
                    </Table>
                </View>
            </View>
        );
    }
    }
}
export default withNavigation(Inventory);
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },

    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});