import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 2,
    borderColor: 'white',
    borderRadius: 4,
    backgroundColor: 'white',
    width: '97%',
    height: 60,
    margin: 6,
    elevation: 3,
    shadowColor: 'blue',
  },

  lefContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
  },
  midContainer: {
    justifyContent: 'space-around',
  },
  textname: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  connectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    width: 105,
    height: 40,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#c4c8cc',
    paddingVertical: 2,
    paddingHorizontal: 1,
    marginLeft: 3,
    marginRight: 2,
    marginBottom: 0,
  },
  deviceId: {
    fontSize: 16,
    color: 'grey',
  },
  connectButtonContainer: {
    paddingRight: 2,
    paddingTop: 2,
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  connectButtonText: {
    color: 'black',
    fontSize: 18,
  },
});
export default styles;
