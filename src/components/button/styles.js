import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 5,
    height: 50,
    backgroundColor: '$stylishBlue',
    marginTop: 10,
  },
  iconHolder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {width: 60, height: 60},
  text: {color: '$basicTextColor', fontSize: 18},
});
