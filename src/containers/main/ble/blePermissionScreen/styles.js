import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {flex: 3, justifyContent: 'flex-end'},
  bottomContainer: {flex: 2},
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: 'stretch',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 70,
  },
  button: {
    marginVertical: 3,
    width: 150,
  },
});

export default styles;
