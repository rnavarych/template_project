import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  listHeader: {
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: 105,
    height: 40,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 5,
    marginRight: 20,
    marginTop: 5,
  },
});

export default styles;
