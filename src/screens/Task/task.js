import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';

import {icons} from '../../asserts';
import {colors} from '../../utils/colors';
import {Header} from '../../components';
import {fetchTaskData} from '../../redux/reducers';

import styles from './task.styles';
import {screenNameString} from '../../utils/constants';

const initialState = {
  appliedFilter: {},
  filteredList: [],
  selectedTask: {},
  isOpenTaskDetail: false,
};

const Task = () => {
  const [
    {appliedFilter, filteredList, selectedTask, isOpenTaskDetail},
    setState,
  ] = useState(initialState);
  const {tasksData, loading} = useSelector(rState => rState, shallowEqual);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchTaskData({key: 'taskList'}));
  }, []);

  const onApplyFilter = selectedFilters => {
    const list = tasksData.filter(item => {
      return Object.entries(selectedFilters).every(([key, value]) => {
        return value.length === 0 || value.includes(item[key]);
      });
    });
    setState(prev => ({
      ...prev,
      appliedFilter: selectedFilters,
      filteredList: list,
    }));
  };

  const onPressMenu = () => {
    navigation.openDrawer();
  };

  const onPressFilter = () => {
    navigation.navigate('Filter', {appliedFilter, onApplyFilter});
  };

  const onRefresh = () => {
    dispatch(fetchTaskData({key: 'refresh'}));
  };

  const onOpenTaskCard = taskDetail => {
    setState(prev => ({
      ...prev,
      selectedTask: taskDetail,
      isOpenTaskDetail: true,
    }));
  };

  const onCloseDetailModal = () =>
    setState(prev => ({
      ...prev,
      isOpenTaskDetail: false,
      selectedTask: {},
    }));

  const renderTaskCard = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onOpenTaskCard(item)}>
        <Text>Description: {item?.Description}</Text>
        <Text>Auth: {item?.Auth}</Text>
      </TouchableOpacity>
    );
  };

  const renderLoader = () => {
    return (
      <Modal transparent={true} visible={true}>
        <View style={styles.loadView}>
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.modalBg} />
          </View>
        </View>
      </Modal>
    );
  };

  const renderTaskDetailModal = () => {
    return (
      <Modal
        visible={isOpenTaskDetail}
        transparent={true}
        onRequestClose={onCloseDetailModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.descriptionText}>Task Details</Text>
              <TouchableOpacity onPress={onCloseDetailModal}>
                <Image source={icons.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text>Description: {selectedTask?.Description}</Text>
            <Text>Category: {selectedTask?.Category}</Text>
            <Text>Auth: {selectedTask?.Auth}</Text>
            <Text>Cors: {selectedTask?.Cors}</Text>
            <Text>API: {selectedTask?.API}</Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={screenNameString.TASK}
        leftIcon={icons.hamburger}
        rightIcon={icons.filter}
        onPressLeftIcon={onPressMenu}
        onPressRightIcon={onPressFilter}
      />
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={loading?.refresh} />
        }
        data={isEmpty(appliedFilter) ? tasksData : filteredList}
        renderItem={renderTaskCard}
      />
      {loading?.taskList && renderLoader()}
      {renderTaskDetailModal()}
    </View>
  );
};

export default Task;
