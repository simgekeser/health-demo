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
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {styles} from './styles';

import {
  HmsDataController,
  HmsSettingController,
} from '@hmscore/react-native-hms-health';
import Utils from './Utils';
import {HmsActivityRecordsController} from '@hmscore/react-native-hms-health';
const dataTypeName = 'com.healthkitsuperdemorn.DT_CONTINUOUS_STEPS_TOTAL';
const fieldValue = HmsSettingController.FIELD_STEPS_DELTA;

export default class SettingController extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  /**
   * add new DataType.
   * you need two object to add new DataType: DataTypeAddOptions and SettingController.
   * specify the field by drop-down box, You cannot add DataType with duplicate DataType's name.
   * You can add multiple field，For simplicity, only one field is added here.
   *
   * @returns {Promise<void>}
   */
  async addNewDataType() {
    try {
      Utils.logCall('addNewDataType - SettingController');

      const result = await HmsSettingController.addNewDataType(
        dataTypeName,
        fieldValue,
      );
      // Return the list of activity records that have stopped
      Utils.logResult('addNewDataType', result);
      Utils.notify('addNewDataType - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * read DataType.
   * Get DataType with the specified name
   *
   * @returns {Promise<void>}
   */
  async readDataType() {
    try {
      Utils.logCall('readDataType - SettingController');

      const result = await HmsSettingController.readDataType(dataTypeName);
      // Return the list of activity records that have stopped
      Utils.logResult('readDataType', result);
      Utils.notify('readDataType - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * disable HiHealth.
   * After calling this function, HiHealth will cancel All your Records.
   *
   * @returns {Promise<void>}
   */
  async disableHiHealth() {
    try {
      Utils.logCall('disableHiHealth - SettingController');

      const result = await HmsSettingController.disableHiHealth();
      // Return the list of activity records that have stopped
      Utils.logResult('disableHiHealth', result);
      Utils.notify('disableHiHealth - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Use the data controller to add a sampling dataset.
   *
   * @returns {Promise<void>}
   */
  async insertSelfData() {
    try {
      Utils.logCall('insertTestData - DataController');
      // Build the dataCollector object
      const dataCollector = {
        dataType: HmsDataController.DT_CONTINUOUS_STEPS_DELTA,
        dataStreamName: 'STEPS_DELTA',
        dataGenerateType: 0,
      };
      //You can use sampleSets to add more sampling points to the sampling dataset.
      const sampleSets = [
        {
          startTime: '2020-09-28 12:00:00',
          endTime: '2020-09-28 16:45:00',
          fieldValue: HmsDataController.FIELD_STEPS_DELTA,
          intValue: 1000,
          timeUnit: HmsDataController.MILLISECONDS,
        },
      ];
      const result = await HmsDataController.insert(dataCollector, sampleSets);
      Utils.logResult('insert  - DataController', result);
      Utils.notify(
        'insert  - DataController - success!' + JSON.stringify(sampleSets),
      );
    } catch (error) {
      Utils.logError(error);
    }
  }

  /**
   * Use the data controller to query the sampling dataset by specific criteria.
   *
   * @returns {Promise<void>}
   */
  async readSelfData() {
    try {
      Utils.logCall('readSelfData - SettingController');
      // Return the list of activity records that have stopped
      Utils.logResult('readSelfData', result);

      const dataCollector = {
        dataType: HmsDataController.DT_CONTINUOUS_STEPS_DELTA,
        dataStreamName: 'STEPS_DELTA',
        dataGenerateType: 0,
      };
      const dateMap = {
        startTime: '2020-07-22 09:00:00',
        endTime: '2020-09-28 16:45:00',
        timeUnit: HmsDataController.MILLISECONDS,
      };
      const result = await HmsDataController.read(dataCollector, dateMap);
      console.log('read  - DataController', result);
      console.log('readSelfData - ' + JSON.stringify(result));
    } catch (error) {
      Utils.logError(error);
    }
  }
  async getActivityRecord() {
    try {
      Utils.logCall('getActivityRecord - ActivityRecordsController');
      // Create start time that will be used to get activity record.
      const startTime = '2020-07-23 09:00:00';

      // Create end time that will be used to get activity record.
      const endTime = '2020-09-29 10:46:00';

      //Build dateMap with defined times above.in
      const dateMap = {
        startTime: startTime,
        endTime: endTime,
        timeUnit: HmsActivityRecordsController.MILLISECONDS,
      };

      // Build an dataType object
      const dataType = {
        dataType: HmsActivityRecordsController.DT_CONTINUOUS_STEPS_DELTA,
      };

      // In this example we will get all the activities for the requested times.
      // Thus, activityRecordId and activityRecordName will be null.
      const activityRecordId = null;
      const activityRecordName = null;

      // Call the related method in the HmsActivityRecordsController to get activity records
      const result = await HmsActivityRecordsController.getActivityRecord(
        dataType,
        dateMap,
        activityRecordId,
        activityRecordName,
      );
      console.log('getActivityRecord', result);
      //console.log('getActivityRecord - ' + JSON.stringify(result));
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <ScrollView style={styles.bg}>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {'Set new data type name, Duplicate names are unacceptable, this name must start with package name, and End with a custom name.' +
              '\n \n In this demo app it is ' +
              dataTypeName +
              '\n \n Choose which Field to select via HmsSettingController.FIELD_VALUES. \n For example in this app, the selected Field is ' +
              fieldValue}
          </Text>
          <View style={styles.buttonDataController}>
            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.getActivityRecord()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}> getactivityrecord </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.readDataType()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}> readDataType </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.disableHiHealth()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}> disableHiHealth </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.h2}>
            {'Use the newly added data type to write or read value.'}
          </Text>
          <View style={styles.buttonDataController}>
            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.insertSelfData()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}> insertSelfData </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.horizontalButton}
              onPress={() => this.readSelfData()}
              underlayColor="#fff">
              <Text style={styles.smallButtonLabel}> readSelfData </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
