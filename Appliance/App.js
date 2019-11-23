
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from './SignIn'
import IR from './IR'

global._isSignIn = false;
global._email = null;
global._ipAddress = "192.168.1.10";



// const RootStack = createStackNavigator(
//   {
//     signIn: SignIn,
//     ir: IR,
//   },
//   {
//     initialRouteName: 'signIn',
//   }
// );

// const AppContainer = createAppContainer(RootStack);

// const MainNavigator = createStackNavigator({
//   signIn: { screen: SignIn },
//   ir: { screen: IR },
// });

// const App = createAppContainer(MainNavigator);

// export default App;

export default class App extends React.Component {
  render() {
    return <SignIn/>;
  }
}
// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Hello, world!</Text>
//       </View>
//     );
//   }
// }

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       signIn: null
//     };

//   }

//   render(){
//     // if (!this.state.signIn){
//     //   <SignIn/>
//     // }else{
//     //   // <IR/>
//     //   <Text>sdsdsd</Text>
//     // }
//   return (
//     // <View style={styles.container}>
//     //   <Text>Open up App.js to start working on your app!</Text>
//     // </View>
//     <SignIn />
//   );
//   }
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// import React, { Component } from 'react';
// import { Text, View } from 'react-native';

// export default class App extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Hello, world!</Text>
//       </View>
//     );
//   }
// }
