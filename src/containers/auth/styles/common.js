import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  screenContainer: {
    flex: 1,
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
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '7%',
    paddingVertical: '7%',
  },
  styledButton: {
    marginVertical: 5,
    backgroundColor: '$stylishBlue',
    height: 50,
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
});
