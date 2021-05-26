import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  
    borderColor: 'gray',
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  tabBarItem: {
  },
  backgroundItem: {
    position: 'absolute',
    borderWidth: 3,
    left: '50%',
    width: 50,
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50,
    height: 55,
    left: 0,
    borderColor: 'gray',
    borderTopWidth:0,
  },
  animeView:{
    position: 'absolute',
    top: -1,
    borderWidth: 0,
  },
});
