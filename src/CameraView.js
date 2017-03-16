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

import Camera from 'react-native-camera';

export default class CameraView extends Component {
  constructor(props) {
    super(props);

    this.takePicture = this.takePicture.bind(this);
  }

  static navigationOptions = {
    title: 'Photographiez votre facture',
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Button style={styles.capture} title="Valider" onPress={this.takePicture}
            color="#841584" />
        </Camera>
      </View>
    );
  }

  takePicture() {

    const { navigate } = this.props.navigation;
    this.camera.capture()
      .then((data) => navigate('EditView', data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 30
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  }
});
