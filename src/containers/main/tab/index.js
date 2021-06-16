import React, {useState} from 'react';
import {View, Animated} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';

import {
  radius,
  tabWidth,
  widthSvg,
  heightSvg,
  viewBoxHeight,
  viewBoxWidth,
  diff,
  curveLineSvgHome,
} from '../../../constants/animation';
import TabItem from '../../../components/tabItem';
import styles from './styles';

const d = curveLineSvgHome;

function CustomTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const [leftValue] = useState(
    new Animated.Value(diff + tabWidth * state.index),
  );
  const {colors} = useTheme();

  const animeStyles = {
    left: leftValue,
  };

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const onPress = (isFocused, index, route) => {
    if (!isFocused) {
      navigation.navigate(route.name);
      Animated.spring(leftValue, {
        toValue: diff + tabWidth * index,
        tension: -5,
        friction: 2.5,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.card}]}>
      <Animated.View style={[styles.animeView, animeStyles]}>
        <Svg
          width={widthSvg}
          height={heightSvg}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
          <Path
            d={d}
            fill={colors.background}
            stroke={colors.background}
            strokeWidth="2"
          />
          <Circle
            cx={viewBoxWidth / 2}
            cy={viewBoxHeight / 2 - 10}
            r={radius}
            fill="white"
          />
        </Svg>
      </Animated.View>
      {state.routes.map((route, index) => (
        <TabItem
          key={index}
          route={route}
          descriptors={descriptors}
          isFocused={state.index === index}
          index={index}
          onPress={onPress}
        />
      ))}
    </View>
  );
}

export default CustomTabBar;
