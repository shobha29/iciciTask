import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, Modal, Text, View} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {icons} from '../../asserts';
import { Header } from '../../components';
import {colors} from '../../utils/colors';
import {fetchLeadData} from '../../redux/reducers';
import {screenNameString} from '../../utils/constants';

import styles from './leads.styles';

const Leads = () => {
  const {leadsData, loading} = useSelector(rState => rState, shallowEqual);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchLeadData());
  }, []);

  const onPressMenu = () => {
    navigation.openDrawer();
  };

  const renderTaskCard = ({item}) => {
    return (
      <View style={styles.card}>
        <Text>Nation: {item?.Nation}</Text>
        <Text>Year: {item?.Year}</Text>
        <Text>Population: {item?.Population}</Text>
      </View>
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

  return (
    <View style={styles.container}>
      <Header
        title={screenNameString.LEADS}
        leftIcon={icons.hamburger}
        onPressLeftIcon={onPressMenu}
      />
      <FlatList data={leadsData} renderItem={renderTaskCard} />
      {loading?.leadList && renderLoader()}
    </View>
  );
};

export default Leads;
