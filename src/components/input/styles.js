import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    paddingStart: 10,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e7ff',
    backgroundColor: 'rgba(224,231,255,0.3)',
  },
  closeButton: {
    marginHorizontal: 10,
  },
  text: {
    paddingStart: 10,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  container: {alignItems: 'flex-start', width: '100%'},
});
