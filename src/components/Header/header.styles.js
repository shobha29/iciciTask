import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  normalizeFont,
} from '../../utils/dimensions';
import {colors} from '../../utils/colors';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.lightBlue,
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: moderateScale(22),
    height: moderateScale(22),
    marginRight: horizontalScale(26),
    tintColor: colors.white,
  },
  rightIcon: {
    width: moderateScale(22),
    height: moderateScale(22),
    marginLeft: horizontalScale(26),
    tintColor: colors.white,
  },
  titleStyle: {
    flex: 1,
    fontSize: normalizeFont(20),
    color: colors.white,
    fontWeight: '700',
  },
  rightTextStyle: {
    fontSize: normalizeFont(16),
    color: colors.header1,
    fontWeight: '700',
  },
  inactive: {
    opacity: 0.5,
  },
});

export default styles;
