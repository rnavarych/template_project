import {StyleSheet} from 'react-native';
import {panelHandler, commandButton, shadowColor} from '../../constants/colors';

export default StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: commandButton,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 30,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  header: {
    backgroundColor: 'white',
    shadowColor: shadowColor,
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandler: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: panelHandler,
  },
  panelTitle: {
    fontSize: 25,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  animated: {
    margin: 50,
  },
  renderInner: {
    alignItems: 'center',
  },
  buttonContent: {
    backgroundColor: 'tomato',
    marginLeft: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '93%',
    height: 50,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
