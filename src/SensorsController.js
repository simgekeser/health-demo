/*
    Copyright 2020. Huawei Technologies Co., Ltd. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import React from 'react';
import {
  NativeEventEmitter,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {styles} from './styles';

import {HmsSensorsController} from '@hmscore/react-native-hms-health';
import Utils from './Utils';

/**
 * {@link SensorsController} class has sample codes that refers to {@link HmsSensorsController}
 * <p>
 * SensorsController supports the processing and development of the following two scenarios:
 * <p>
 * Scenario 1:
 * To connect to a built-in sensor of the phone (such as a pedometer) to obtain data, you can directly call the register method of SensorsController to register a listener to obtain the data reported by the built-in sensor.
 * <p>
 * Scenario 2:
 * To connect to an external BLE device (such as a bathroom scale and heart rate strap) to obtain data, you need to first create a BleController object, call the beginScan() method to scan for available BLE devices, and call the saveDevice method to save the device information.
 * Then you can call the register method of SensorsController to register a listener to obtain the data reported by the device.
 */
export default class SensorsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bleDeviceInfo: {},
    };
  }

  componentDidMount() {
    Utils.logCall(' componentDidMount - SensorsController');
    (async () => {
      // Create SensorsController and BleController first when accessing the UI.
      await this.initSensorsController();
      await this.initBleController();
    })();

    const eventEmitter = new NativeEventEmitter(HmsSensorsController);

    /**
     * Register to SensorsController event.
     * 'registerSteps' event called every time the registerSteps - onSamplePoint listener is triggered.
     */
    eventEmitter.addListener('registerSteps', (event) => {
      console.log(event);
      Utils.notify('registerSteps - ' + JSON.stringify(event));
    });

    /**
     * Create a listener object for heart rate data.
     * The received heart rate data will be called back to 'registerHeartRate' identifier.
     *
     * 'registerHeartRate' event called every time the registerHeartRate - onSamplePoint listener is triggered.
     */
    eventEmitter.addListener('registerHeartRate', (event) => {
      console.log(event);
      Utils.notify('registerHeartRate - ' + JSON.stringify(event));
    });

    /**
     * Save the scanned heart rate devices to the variables for later use.
     */
    eventEmitter.addListener(
      'OnDeviceDiscover - ' + 'bleHeartRateIdentifier',
      (event) => {
        console.log(event);
        this.setState({bleDeviceInfo: event});
        Utils.notify('OnDeviceDiscover - ' + JSON.stringify(event));
      },
    );

    /**
     * Notify once the scanning ends.
     */
    eventEmitter.addListener(
      'OnScanEnd - ' + 'bleHeartRateIdentifier',
      (event) => {
        console.log(event);
        Utils.notify('OnScanEnd - ' + JSON.stringify(event));
      },
    );
    this.eventListener = eventEmitter;
  }

  componentWillUnmount() {
    try {
      this.eventListener.remove();
    } catch (error) {}
  }

  /**
   * To work with SensorsController, Sign in to your HUAWEI ID to obtain SensorsController first.
   *
   * @returns {Promise<void>}
   */
  async initSensorsController() {
    try {
      Utils.logCall('initSensorsController - SensorsController');
      const result = await HmsSensorsController.initSensorsController();
      Utils.logResult('initSensorsController', result);
      Utils.notify('initSensorsController - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * To work with BleController, Sign in to your HUAWEI ID to obtain BleController first.
   *
   * @returns {Promise<void>}
   */
  async initBleController() {
    try {
      Utils.logCall('initBleController - SensorsController');
      const result = await HmsSensorsController.initBleController();
      Utils.logResult('initBleController', result);
      Utils.notify('initBleController - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Register an event to obtain the step count from the phone.
   * </br>
   * To connect to a built-in sensor of the phone (such as a pedometer) to obtain data,
   * you can directly call the register method of HmsSensorsController to register a listener to obtain the data reported by the built-in sensor.
   * <p>
   * Note: Listen register events via 'samplePointIdentifier', In this example the identifier is 'registerSteps'.
   * </p>
   *
   *  @returns {Promise<void>}
   */
  async registerSteps() {
    try {
      Utils.logCall('registerSteps - SensorsController');
      const dataType = {
        dataType: HmsSensorsController.DT_CONTINUOUS_STEPS_TOTAL,
      };
      const result = await HmsSensorsController.register(
        dataType,
        'registerSteps',
      );
      Utils.logResult('registerSteps', result);
      Utils.notify('registerSteps - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Unregister the event for the step count.
   * </br>
   * If you do not need to receive the incremental step count data, use the HmsSensorsController.unregister method to unregister the listener with registerIdentifier,
   * This unregister method uses 'unregisterSteps' identifier.
   *
   * @returns {Promise<void>}
   */
  async unregisterSteps() {
    try {
      Utils.logCall('unregisterSteps - SensorsController');
      const result = await HmsSensorsController.unregister('registerSteps');
      Utils.logResult('unregisterSteps', result);
      Utils.notify('unregisterSteps - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Register an event for the heart rate device.
   *
   * </br>
   * To connect to a built-in sensor of the phone (such as a pedometer) to obtain data,
   * you can directly call the register method of HmsSensorsController to register a listener to obtain the data reported by the built-in sensor.
   * <p>
   * Note: Listen register events via 'samplePointIdentifier', In this example the identifier is 'registerHeartRate'.
   * </p>
   *
   * @returns {Promise<void>}
   */
  async registerHeartRate() {
    try {
      Utils.logCall('registerHeartRate - SensorsController');
      const dataType = {
        dataType: HmsSensorsController.DT_INSTANTANEOUS_HEART_RATE,
      };
      const result = await HmsSensorsController.register(
        dataType,
        'registerHeartRate',
      );
      Utils.logResult('registerHeartRate', result);
      Utils.notify('registerHeartRate - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Unregister the event for the step count.
   * </br>
   * If you do not need to receive the heart rate data, use the HmsSensorsController.unregister method to unregister the listener with registerIdentifier,
   * This unregister method uses 'unregisterHeartRate' identifier.
   *
   * @returns {Promise<void>}
   */
  async unregisterHeartRate() {
    try {
      Utils.logCall('unregisterHeartRate - SensorsController');
      const result = await HmsSensorsController.unregister('registerHeartRate');
      Utils.logResult('unregisterHeartRate', result);
      Utils.notify('unregisterHeartRate - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Enable Bluetooth scanning to scan for external Bluetooth devices capable of monitoring the heart rate.
   * <p>
   * Note: Listen ble scan events via identifiers, In this example the identifier is 'bleHeartRateIdentifier'.
   * </p>
   *
   * @returns {Promise<void>}
   */
  async scanHeartRateDevices() {
    try {
      Utils.logCall('scanHeartRateDevices - SensorsController');
      const dataType = [HmsSensorsController.DT_INSTANTANEOUS_HEART_RATE];
      const time = 15;

      // Pass the heart rate data type as an array.
      // Multiple data types can be passed at a time.
      // The scanning time is set to 15 seconds.
      const result = await HmsSensorsController.beginScan(
        dataType,
        time,
        'bleHeartRateIdentifier',
      );
      Utils.logResult('scanHeartRateDevices', result);
      Utils.notify('scanHeartRateDevices - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Forcibly stop Bluetooth scanning.
   *
   * @returns {Promise<void>}
   */
  async stopScanning() {
    try {
      Utils.logCall('stopScanning - SensorsController');
      const result = await HmsSensorsController.endScan(
        'bleHeartRateIdentifier',
      );
      Utils.logResult('stopScanning', result);
      Utils.notify('stopScanning - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Save the scanned heart rate devices to the local device for the listener that will be registered later to obtain
   * data.
   *
   * @returns {Promise<void>}
   */
  async saveHeartRateDevice() {
    try {
      Utils.logCall('saveHeartRateDevice - SensorsController');
      const result = await HmsSensorsController.saveDevice(
        this.state.bleDeviceInfo,
      );
      Utils.logResult('saveHeartRateDevice', result);
      Utils.notify('saveHeartRateDevice - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Delete the heart rate device information that has been saved.
   *
   * @returns {Promise<void>}
   */
  async removeHeartRateDevice() {
    try {
      Utils.logCall('removeHeartRateDevice - SensorsController');
      const result = await HmsSensorsController.deleteDevice(
        this.state.bleDeviceInfo,
      );
      Utils.logResult('removeHeartRateDevice', result);
      Utils.notify('removeHeartRateDevice - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * List all external Bluetooth devices that have been saved to the local device.
   *
   * @returns {Promise<void>}
   */
  async listMatchedDevices() {
    try {
      Utils.logCall('listMatchedDevices - SensorsController');
      const result = await HmsSensorsController.getSavedDevices();
      Utils.logResult('listMatchedDevices', result);
      Utils.notify('listMatchedDevices - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Find available data collectors from the saved devices in the list.
   *
   * @returns {Promise<void>}
   */
  async findDataCollectors() {
    try {
      Utils.logCall('findDataCollectors - SensorsController');
      const dataType = {
        dataType: HmsSensorsController.DT_INSTANTANEOUS_HEART_RATE,
      };

      const result = await HmsSensorsController.getDataCollectors(dataType);
      Utils.logResult('findDataCollectors', result);
      Utils.notify('findDataCollectors - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  render() {
    return (
      <ScrollView style={styles.bg}>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {'Initialize the SensorsController first'}
          </Text>
          <View style={styles.buttonDataController}>
            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.initSensorsController()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {' '}
                initSensorsController{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>{'Initialize the BleController'}</Text>
          <View style={styles.buttonDataController}>
            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.initBleController()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}> initBleController </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {'Registering and unregistering a listener for step counting'}
          </Text>
          <View style={styles.horizontalButtons}>
            <TouchableOpacity
              style={styles.sensorButton}
              onPress={() => this.registerSteps()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'registerSteps\nViaPhone'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sensorButton}
              onPress={() => this.unregisterSteps()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'unregisterSteps\nViaPhone'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {'Scanning and saving Bluetooth devices'}
          </Text>
          <View style={styles.buttonDataController}>
            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.scanHeartRateDevices()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'scanHeartRateDevices'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.stopScanning()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>{'stopScanning'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.saveHeartRateDevice()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'saveHeartRateDevice'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.listMatchedDevices()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'listMatchedDevices'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {
              'Registering and unregistering a listener for heart rate monitoring'
            }
          </Text>
          <View style={styles.horizontalButtons}>
            <TouchableOpacity
              style={styles.sensorButton}
              onPress={() => this.registerHeartRate()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'register\nHeartRate'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sensorButton}
              onPress={() => this.unregisterHeartRate()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'unregister\nHeartRate'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {
              'Searching for available data collectors and deleting Bluetooth devices'
            }
          </Text>
          <View style={styles.horizontalButtons}>
            <TouchableOpacity
              style={styles.sensorButton}
              onPress={() => this.findDataCollectors()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'find\nDataCollectors'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sensorButton}
              onPress={() => this.removeHeartRateDevice()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'remove\nHeartRateDevice'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
