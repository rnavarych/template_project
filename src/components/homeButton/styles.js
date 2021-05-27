import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  content: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: 'tomato',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  textStyle: {
    marginTop: 5,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
