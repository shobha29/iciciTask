import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../utils/colors';
import styles from './header.styles';

const gradientColors = [colors.header1, colors.header2, colors.header3];

const Header = ({
  title = '',
  leftIcon = false,
  rightIcon = false,
  headerTextStyle = {},
  rightText = false,
  headerGradientColors = gradientColors,
  inActiveRightText = false,
  onPressLeftIcon = () => {},
  onPressRightIcon = () => {},
  rightTextPress = () => {},
}) => {
  return (
    <LinearGradient
      colors={headerGradientColors}
      style={styles.headerContainer}>
      {leftIcon && (
        <TouchableOpacity onPress={onPressLeftIcon}>
          <Image source={leftIcon} style={styles.leftIcon} />
        </TouchableOpacity>
      )}
      <Text style={[styles.titleStyle, headerTextStyle]}>{title}</Text>
      {rightIcon && (
        <TouchableOpacity onPress={onPressRightIcon}>
          <Image source={rightIcon} style={styles.rightIcon} />
        </TouchableOpacity>
      )}
      {rightText && (
        <TouchableOpacity disabled={inActiveRightText} onPress={rightTextPress}>
          <Text
            style={[
              styles.rightTextStyle,
              inActiveRightText && styles.inactive,
            ]}>
            {rightText}
          </Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default Header;
