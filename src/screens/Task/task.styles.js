import {StyleSheet} from 'react-native';

import {colors} from '../../utils/colors';
import {
  deviceHeight,
  horizontalScale,
  moderateScale,
  normalizeFont,
  verticalScale,
} from '../../utils/dimensions';

const {white, modalFadedBg50} = colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  card: {
    marginHorizontal: horizontalScale(16),
    backgroundColor: white,
    marginVertical: verticalScale(8),
    padding: moderateScale(10),
    elevation: 10,
    borderRadius: moderateScale(8),
  },
  loadView: {
    flex: 1,
    backgroundColor: modalFadedBg50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    borderRadius: moderateScale(10),
    backgroundColor: white,
    padding: moderateScale(25),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.modalBg,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    height: deviceHeight * 0.6,
    borderTopEndRadius: moderateScale(16),
    borderTopStartRadius: moderateScale(16),
    padding: moderateScale(20),
  },
  closeIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  modalHeader: {
    flexDirection: 'row',
    marginBottom: verticalScale(24),
  },
  descriptionText: {
    flex: 1,
    fontSize: normalizeFont(18),
    color: colors.black,
  },
});

export default styles;
