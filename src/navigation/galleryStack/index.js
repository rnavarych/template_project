import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import * as routes from '../../constants/routes';

import GalleryScreen from '../../containers/main/gallery';

const TopTab = createMaterialTopTabNavigator();

const GalleryComponent = props => {
    const {name} = props.route;
    if (name === routes.GALLERY_SCREEN) {
      return <GalleryScreen tabName={routes.GALLERY_SCREEN} />;
    } else {
      return <GalleryScreen tabName={routes.FAVOURITES_SCREEN} />;
    }
  };
  
  const GalleryStackScreen = () => {
    return (
      <TopTab.Navigator>
        <TopTab.Screen
          name={routes.GALLERY_SCREEN}
          component={GalleryComponent}
        />
        <TopTab.Screen
          name={routes.FAVOURITES_SCREEN}
          component={GalleryComponent}
        />
      </TopTab.Navigator>
    );
  };

  export default GalleryStackScreen;