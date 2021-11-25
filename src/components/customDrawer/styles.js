import {StyleSheet} from 'react-native';
import {
  menuButton,
} from '../../constants/colors';

const styles = StyleSheet.create({
  wrapContainer: {
    position: 'absolute',
    top: 0,
  },
  drawerMainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  imageStyle: {
    borderWidth: 0,
    borderColor: 'black',
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  drawerUserContainer: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingLeft: 30,
  },
  userTextContainer: {marginLeft: 0, flexDirection: 'column'},
  title: {
    fontSize: 18,
    marginTop: 4,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
    lineHeight: 16,
  },
  drawerSection: {
    marginTop: 15,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  buttonStyle: {
    height: 45,
    width: 110,
    backgroundColor: menuButton,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 14,
  },
});

export default styles;
