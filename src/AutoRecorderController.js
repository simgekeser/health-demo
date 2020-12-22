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
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  NativeEventEmitter,
} from 'react-native';

import {styles} from './styles';

import {HmsAutoRecorderController} from '@hmscore/react-native-hms-health';
import Utils from './Utils';

/**
 * {@link AutoRecorderController} class has sample codes for {@link HmsAutoRecorderController}
 */
export default class AutoRecorderController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {},
    };
  }

  componentDidMount() {
    Utils.logCall('call componentDidMount - AutoRecorderController');
    const eventEmitter = new NativeEventEmitter(HmsAutoRecorderController);

    /**
     * Event Listener for startRecord by Data Type.
     */
    this.eventListener = eventEmitter.addListener(
      'onCompleteStartRecordByType',
      (event) => {
        console.log(event);
        Utils.notify('onCompleteStartRecordByType - ' + JSON.stringify(event));
      },
    );

    /**
     * Event Listener for startRecord by Data Collector.
     */
    this.eventListener = eventEmitter.addListener(
      'onCompleteStartRecordByCollector',
      (event) => {
        console.log(event);
        Utils.notify(
          'onCompleteStartRecordByCollector - ' + JSON.stringify(event),
        );
      },
    );

    /**
     * Event Listener for stopRecord by Data Type.
     */
    this.eventListener = eventEmitter.addListener(
      'onCompleteStopRecordByType',
      (event) => {
        console.log(event);
        Utils.notify('onCompleteStopRecordByType - ' + JSON.stringify(event));
      },
    );

    /**
     * Event Listener for stopRecord by Data Collector.
     */
    this.eventListener = eventEmitter.addListener(
      'onCompleteStopRecordByCollector',
      (event) => {
        console.log(event);
        Utils.notify(
          'onCompleteStopRecordByCollector - ' + JSON.stringify(event),
        );
      },
    );

    this.eventListener = eventEmitter;
  }

  componentWillUnmount() {
    try {
      this.eventListener.remove();
    } catch (error) {
      return;
    }
  }

  /**
   * Start record By DataType, the data from sensor will be inserted into database automatically until call Stop
   * Interface.
   *
   * DT_CONTINUOUS_STEPS_TOTAL as sample, after startRecord this type, the total steps will be inserted into
   * database when u shake ur handset.
   *
   * @returns {Promise<void>}
   */
  async startRecordByType() {
    try {
      Utils.logCall('startRecordByType - AutoRecorderController');
      const dataType = {
        dataType: HmsAutoRecorderController.DT_CONTINUOUS_STEPS_TOTAL,
      };
      const result = await HmsAutoRecorderController.startRecordByType(
        dataType,
        this.eventListener,
      );
      Utils.logResult('startRecordByType', result);
      Utils.notify('startRecordByType - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Record data by DataCollector.
   *
   * When recording data from a data collector, you must specify the data type and collector type (for example, raw data or derived data).
   * The raw data is reported directly from the sensor without any data processing.
   * The derived data has been processed (such as by averaging, division, and other statistical operations), based on the raw data.
   *
   * @returns {Promise<void>}
   */
  async startRecordByCollector() {
    try {
      Utils.logCall('startRecordByCollector - AutoRecorderController');
      // Build the dataCollector object
      const dataCollector = {
        dataType: HmsAutoRecorderController.DT_CONTINUOUS_STEPS_DELTA,
        dataGenerateType: 0,
      };
      const result = await HmsAutoRecorderController.startRecordByCollector(
        dataCollector,
      );
      console.log('startRecordByCollector', result);
      console.log('startRecordByCollector - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Stop record By DataType, the data from sensor will NOT be inserted into database automatically
   *
   * DT_CONTINUOUS_STEPS_TOTAL as sample, after stopRecord this type, the total steps will NOT be inserted into
   * database when u shake ur handset
   *
   * @returns {Promise<void>}
   */
  async stopRecordByType() {
    try {
      Utils.logCall('stopRecordByType - AutoRecorderController');
      const dataType = {
        dataType: HmsAutoRecorderController.DT_CONTINUOUS_STEPS_TOTAL,
      };
      const result = await HmsAutoRecorderController.stopRecordByType(dataType)
      Utils.logResult('stopRecordByType', result);
      Utils.notify('stopRecordByType - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Stop recoding by specifying the data collector, the data from sensor will NOT be inserted into database automatically
   *
   * If you want to stop record by DataCollector,
   * using the same collector which requested in startRecordByCollector should be better.
   *
   * @returns {Promise<void>}
   */
  async stopRecordByCollector() {
    try {
      Utils.logCall('stopRecordByType - AutoRecorderController');
      // Build the dataCollector object
      const dataCollector = {
        dataType: HmsAutoRecorderController.DT_CONTINUOUS_STEPS_DELTA,
        dataGenerateType: 0,
      };
      const result = await HmsAutoRecorderController.stopRecordByCollector(
        dataCollector,
      );
      Utils.logResult('stopRecordByType', result);
      Utils.notify('stopRecordByType - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Stop recoding by specifying the data record.
   * </br>
   * Stop record by calling the {@code autoRecsorderController.getRecords()} first, the data from sensor will NOT be inserted into database automatically
   *
   * <p>
   * Note: You are advised to obtain the record using the getRecords method or create the record by specifying the data type and/or data collector.
   * Although HMS's Record can be constructed directly, it is still recommended that third-party developers
   * use the getRecords interface to obtain the record, and then stop recording data through stopRecordByRecord.
   * </p>
   *
   * @returns {Promise<void>}
   */
  async stopRecordByRecord() {
    try {
      Utils.logCall('stopRecordByRecord - AutoRecorderController');
      const record = {
        record: this.state.record,
      };
      const result = await HmsAutoRecorderController.stopRecordByRecord(record);
      Utils.logResult('stopRecordByRecord', result);
      Utils.notify('stopRecordByRecord - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * View all records of the current app.
   * </br>
   * You can view all current active data recording tasks. Data recording tasks that have stopped will not show up.
   *
   * @returns {Promise<void>}
   */
  async getAllRecords() {
    try {
      Utils.logCall('getAllRecords - AutoRecorderController');
      const result = await HmsAutoRecorderController.getAllRecords();
      Utils.logResult('getArrayRecords', result);
      const records = result.records; //records array
      console.log('getRecords', records);
      const firstRecord = records[0]; //select the first record in the array.
      console.log('getfirstRecords', firstRecord);
    } catch (error) {
      Utils.logError(error);
      Utils.logError(error);
    }
  }

  /**
   * Get record info of this application base on the dataType.
   * View all records of a specific type.
   * </br>
   * When obtaining the record data by the specific type, data of recording tasks started by specifying the data collector will also be obtained as long as the data type in the collector is the same as that in the input parameters.
   *
   * @returns {Promise<void>}
   */
  async getAllRecordsByType() {
    try {
      // Get the record information through datatype. In addition to the records started with datatype, the records
      // started with DataCollector will also be obtained (if the datatype in this DataCollector is the same as the
      // datatype in the getrecords input parameter)
      Utils.logCall('getAllRecordsByType - AutoRecorderController');
      const dataType = {
        dataType: HmsAutoRecorderController.DT_CONTINUOUS_STEPS_TOTAL,
      };
      const result = await HmsAutoRecorderController.getRecords(dataType);
      Utils.logResult('getAllRecordsByType', result);
      const records = result.records; //records array
      Utils.logResult('getAllRecordsByType', records);
      const firstRecord = records.length; //select the first record in the array.
      console.log('getAllRecordsByType', firstRecord);
      this.setState({record: firstRecord});
      Utils.notify('getAllRecordsByType - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  render() {
    return (
      <ScrollView style={styles.bg}>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {
              'Starting or stopping automatic recording of accumulated step count by data type'
            }
          </Text>
          <View style={styles.buttonDataController}>
            <TouchableOpacity
              style={styles.autoRecorderButton}
              onPress={() => this.startRecordByType()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'startRecordByDataType'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.autoRecorderButton}
              onPress={() => this.stopRecordByType()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'stopRecordByDataType'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {
              'Starting or stopping automatic recording of accumulated step count by data collector'
            }
          </Text>
          <View style={styles.buttonDataController}>
            <TouchableOpacity
              style={styles.autoRecorderButton}
              onPress={() => this.startRecordByCollector()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'startRecordByDataCollector'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.autoRecorderButton}
              onPress={() => this.stopRecordByCollector()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'stopRecordByDataCollector'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {
              'Stopping automatic recording of accumulated step count by data record'
            }
          </Text>
          <View style={styles.buttonDataController}>
            <TouchableOpacity
              style={styles.autoRecorderButton}
              onPress={() => this.stopRecordByRecord()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'stopRecordByRecord'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {'Obtaining all data records of the app'}
          </Text>
          <View style={styles.buttonDataController}>
            <TouchableOpacity
              style={styles.autoRecorderButton}
              onPress={() => this.getAllRecords()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>{'getAllRecords'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {
              'Obtaining the data record related to the accumulated step count of the app'
            }
          </Text>
          <View style={styles.buttonDataController}>
            <TouchableOpacity
              style={styles.autoRecorderButton}
              onPress={() => this.getAllRecordsByType()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}>
                {'getRecordsByDataType'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
