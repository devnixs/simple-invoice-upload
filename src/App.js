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