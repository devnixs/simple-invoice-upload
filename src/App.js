/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ToastAndroid
} from 'react-native';

import Home from './Home';
import CameraView from './CameraView';
import EditView from './EditView';

import {
  StackNavigator,
} from 'react-navigation';

export default App = StackNavigator({
  Home: {screen: Home},
  CameraView: {screen: CameraView},
  EditView: {screen: EditView},
});

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       page: 'home',
//     }

//     this.onStart = this.onStart.bind(this);
//     this.onPictureTaken = this.onPictureTaken.bind(this);
//     this.onSendInvoice = this.onSendInvoice.bind(this);
//   }

//   onStart() {
//     ToastAndroid.show('Awesome ! Maintenant, prenez votre facture en photo.', ToastAndroid.SHORT);
//     this.setState({
//       page: 'camera',
//     });
//   }


//   onPictureTaken(data) {
//     this.setState({
//       pictureUrl: data.path,
//       page: 'edit',
//     })
//   }

//   onSendInvoice(data){
//     console.log(data);
//   }

//   render() {
//     switch (this.state.page) {
//       case 'home':
//         return <Home onStart={this.onStart} />
//       case 'camera':
//         return <CameraView onPictureTaken={this.onPictureTaken} />
//       case 'edit':
//         return <EditView onSendInvoice={this.onSendInvoice} imageSrc={this.state.pictureUrl}/>
//       default:
//         return <Home />
//     }
//   }
// }
