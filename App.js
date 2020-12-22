import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import React, {Component} from 'react';
import DataController from './src/DataController';
import MainPage from './src/MainPage';
import SensorsController from './src/SensorsController';
import AutoRecorderController from './src/AutoRecorderController';
import ActivityRecordsController from './src/ActivityRecordsController';
import SettingController from './src/SettingController';

const AppNavigator = createStackNavigator({
  StartPage: {
    screen: MainPage,
    navigationOptions: {
      headerTitle: 'RN HMS Health Kit Demo',
    },
    path: 'start',
  },
  DataController: {
    screen: DataController,
    navigationOptions: {
      headerTitle: 'Data Controller',
    },
    path: 'data-controller',
  },
  SensorsController: {
    screen: SensorsController,
    navigationOptions: {
      headerTitle: 'Sensors Controller',
    },
    path: 'sensors-controller',
  },
  AutoRecorderController: {
    screen: AutoRecorderController,
    navigationOptions: {
      headerTitle: 'Auto Recorder Controller',
    },
    path: 'auto-recorder-controller',
  },
  ActivityRecordsController: {
    screen: ActivityRecordsController,
    navigationOptions: {
      headerTitle: 'Activity Records Controller',
    },
    path: 'activity-records-controller',
  },
  SettingController: {
    screen: SettingController,
    navigationOptions: {
      headerTitle: 'Setting Controller',
    },
    path: 'setting-controller',
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component<{}> {
  state = {
    status: 'starting',
    message: '--',
  };
  componentDidMount() {}

  render() {
    return <AppContainer />;
  }
}
