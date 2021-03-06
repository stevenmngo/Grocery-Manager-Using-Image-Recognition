
//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
//import react in our code.
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';

// import all basic components

//For React Navigation 3+
//import {
//  createStackNavigator,
//  createDrawerNavigator,
//  createAppContainer,
//} from 'react-navigation';

//For React Navigation 4+
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

// import { NetworkInfo } from "react-native-network-info";
//Import all the screens
import History from './pages/History';
import IR from './pages/IR';
import Inventory from './pages/Inventory';
import Tab from './pages/Auth/Tab'

//Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';

global.currentScreenIndex = 0;
global._isSignIn = false;
global._email = "";
// require module

// Get Local IP
global._ipAddress = "192.168.1.16";

console.log(global._ipAddress)
//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };

  // async componentDidMount() {
  //   global._ipAddress = await Network.getIpAddressAsync();
  //   console.log(global._ipAddress)
  // }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./images/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>

      </View>
    );
  }
}

//Stack Navigator for the Second Option of Navigation Drawer
const IR_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  First: {
    screen: IR,
    navigationOptions: ({ navigation }) => ({
      title: 'Scan Item',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for the First Option of Navigation Drawer
const Inventory_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  Second: {
    screen: Inventory,
    navigationOptions: ({ navigation }) => ({
      title: 'Inventory',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for the First Option of Navigation Drawer
const History_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  Third : {
    screen: History,
    navigationOptions: ({ navigation }) => ({
      title: 'History',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});


//Stack Navigator for the Second Option of Navigation Drawer
const Auth_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  Fourth: {
    screen: Tab,
    navigationOptions: ({ navigation }) => ({
      title: 'Auth',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Drawer Navigator Which will provide the structure of our App
const DrawerNavigatorExample = createDrawerNavigator(
  {
    //Drawer Optons and indexing

    auth: {
      screen: Auth_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Auth',
      },
    },
    ir: {
      screen: IR_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Scan Item',
      },
    },

    inventory: {
      screen: Inventory_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Inventory',
      },
    },
    history: {
      screen: History_StackNavigator,
      navigationOptions: {
        drawerLabel: 'History',
      },
    },


  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
  }
);
export default createAppContainer(DrawerNavigatorExample);
