import {StyleSheet} from 'react-native';

import {colors} from '../../utils/colors';
import {
  horizontalScale,
  moderateScale,
  normalizeFont,
  verticalScale,
} from '../../utils/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.filterBg,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: normalizeFont(16),
  },
  horizontalLine: {
    borderBottomColor: colors.fadedGreen,
    borderBottomWidth: verticalScale(0.2),
    marginTop: verticalScale(16),
  },
  forwardIcon: {
    width: moderateScale(14),
    height: moderateScale(14),
    tintColor: colors.white,
  },
  filterView: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.darkBlue,
    marginBottom: verticalScale(2),
  },
  filterText: {
    fontSize: normalizeFont(14),
    color: colors.white,
    fontWeight: '600',
  },
  applyBtn: {
    padding: moderateScale(20),
    backgroundColor: colors.header2,
    alignItems: 'center',
  },
  applyText: {
    color: colors.white,
    fontSize: normalizeFont(16),
    fontWeight: '700',
  },
  filterCheckBox: {
    flexDirection: 'row',
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
  },
  checkBox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderWidth: moderateScale(2),
    borderColor: colors.white,
    borderRadius: moderateScale(5),
    marginRight: horizontalScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledCheckBox: {
    backgroundColor: colors.white,
  },
  tickIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: colors.filterBg,
  },
  orangeText: {
    color: colors.header2,
  },
  disableBtn: {
    backgroundColor: colors.neutral60,
  },
});

export default styles;
