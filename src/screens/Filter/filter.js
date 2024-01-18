import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {isEmpty, cloneDeep} from 'lodash';

import {icons} from '../../asserts';
import {Header} from '../../components';
import {colors} from '../../utils/colors';
import {screenNameString} from '../../utils/constants';

import styles from './filter.styles';
import {filterOptions} from './helper';

const {filterBg} = colors;

const SELECT_ALL = 'select_all';

const initialState = {
  selectedOption: {},
  selectedFilter: {},
};

const Filter = () => {
  const [{selectedOption, selectedFilter}, setState] = useState(initialState);
  const navigation = useNavigation();
  const {params = {}} = useRoute();

  const {appliedFilter = {}, onApplyFilter = () => {}} = params;

  const innerFilterOptions = useMemo(() => {
    return isEmpty(selectedOption)
      ? []
      : [
          {name: 'Select All', value: SELECT_ALL},
          ...selectedOption?.filterValues,
        ];
  }, [selectedOption]);

  useEffect(() => {
    setState(prev => ({...prev, selectedFilter: appliedFilter}));
  }, [appliedFilter]);

  const onPressBack = () => navigation.goBack();

  const onRightTextPress = () => {
    setState(prev => ({...prev, selectedFilter: {}}));
  };

  const onPressApply = () => {
    onApplyFilter(selectedFilter);
    onPressBack();
  };

  const onResetSelection = () =>
    setState(prev => ({...prev, selectedOption: {}}));

  const onSelectFilter = filter => {
    const currentOption = selectedOption?.value;
    const currentFilter = filter?.value;
    const filterObj = cloneDeep(selectedFilter);

    if (currentFilter === SELECT_ALL) {
      const allFilter = selectedOption?.filterValues?.map(item => item?.value);
      if (allFilter?.length === filterObj[currentOption]?.length) {
        delete filterObj[currentOption];
      } else {
        filterObj[currentOption] = allFilter;
      }
    } else if (filterObj.hasOwnProperty(currentOption)) {
      const filterArr = filterObj[currentOption];
      if (filterArr.includes(currentFilter)) {
        const index = filterArr?.indexOf(currentFilter);
        filterObj[currentOption]?.splice(index, 1);
      } else {
        filterObj[currentOption].push(currentFilter);
      }
    } else {
      filterObj[currentOption] = [currentFilter];
    }
    setState(prev => ({...prev, selectedFilter: filterObj}));
  };

  const getDisableApplyBtn = () => {
    const appliedKey = Object.keys(appliedFilter);
    const selectedKey = Object.keys(selectedFilter);

    if (
      appliedKey.length !== selectedKey.length ||
      !appliedKey.every(key => selectedKey.includes(key))
    ) {
      return false;
    }

    return appliedKey.every(key => {
      const appliedVal = appliedFilter[key];
      const selectedVal = selectedFilter[key];

      return (
        appliedVal.length === selectedVal.length &&
        appliedVal.every(value => selectedVal.includes(value))
      );
    });
  };

  const keyExtractor = (_, index) => index.toString();

  const renderFilterOptions = ({item}) => {
    const isSelected = Object.keys(selectedFilter).includes(item?.value);

    return (
      <TouchableOpacity
        style={styles.filterView}
        onPress={() => setState(prev => ({...prev, selectedOption: item}))}>
        <Text style={[styles.filterText, isSelected && styles.orangeText]}>
          {item?.name}
        </Text>
        <Image source={icons.forward} style={styles.forwardIcon} />
      </TouchableOpacity>
    );
  };

  const renderFilterInnerOptions = ({item}) => {
    const currentOption = selectedOption?.value;
    const isSelectAllText = item?.value === SELECT_ALL;
    const allFilter = selectedOption?.filterValues?.map(item => item?.value);

    const isSelectedAllFilter =
      allFilter?.length === selectedFilter[currentOption]?.length &&
      isSelectAllText;

    const isSelected =
      selectedFilter[currentOption]?.includes(item?.value) ||
      isSelectedAllFilter;

    return (
      <TouchableOpacity
        style={styles.filterCheckBox}
        onPress={() => onSelectFilter(item)}>
        <View style={[styles.checkBox, isSelected && styles.filledCheckBox]}>
          {isSelected && <Image source={icons.tick} style={styles.tickIcon} />}
        </View>
        <Text style={[styles.filterText, isSelectAllText && styles.orangeText]}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={
          isEmpty(selectedOption)
            ? screenNameString.FILTERS
            : selectedOption?.name
        }
        leftIcon={isEmpty(selectedOption) ? icons.close : icons.back}
        onPressLeftIcon={
          isEmpty(selectedOption) ? onPressBack : onResetSelection
        }
        headerGradientColors={[filterBg, filterBg]}
        headerTextStyle={styles.headerText}
        rightText={isEmpty(selectedOption) ? 'Clear' : ''}
        rightTextPress={onRightTextPress}
        inActiveRightText={isEmpty(selectedFilter)}
      />

      <View style={styles.horizontalLine} />

      <FlatList
        data={isEmpty(selectedOption) ? filterOptions : innerFilterOptions}
        renderItem={
          isEmpty(selectedOption)
            ? renderFilterOptions
            : renderFilterInnerOptions
        }
        keyExtractor={keyExtractor}
      />

      {isEmpty(selectedOption) && (
        <TouchableOpacity
          disabled={getDisableApplyBtn()}
          style={[styles.applyBtn, getDisableApplyBtn() && styles.disableBtn]}
          onPress={onPressApply}>
          <Text style={styles.applyText}>APPLY</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Filter;
