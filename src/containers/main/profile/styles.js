import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '7%',
    paddingVertical: '7%',
  },
  styledSmallButton: {
    top: 25,
    bottom: 0,
    backgroundColor: '$stylishBlue',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    height: 30,
    borderRadius: 5,
    width: 70
  },
  styledSmallButtonRed: {
    top: 25,
    bottom: 0,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '$warningRed',
    height: 30,
    borderRadius: 5,
    width: 70
  },
  styledButton: {
    marginVertical: 5,
    backgroundColor: '$stylishBlue',
    height: 40,
    borderRadius: 5,
  },
  buttonContainer: {
    //flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  errorText: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  userForm: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMargin: {
    marginVertical: 5,
  },
});
