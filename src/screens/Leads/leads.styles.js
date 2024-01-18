import {StyleSheet} from 'react-native';

import {colors} from '../../utils/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/dimensions';

const {white, modalFadedBg50} = colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginHorizontal: horizontalScale(16),
    backgroundColor: white,
    marginVertical: verticalScale(8),
    padding: moderateScale(10),
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
});

export default styles;
