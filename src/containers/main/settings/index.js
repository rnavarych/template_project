import React, {useEffect} from 'react';
import {I18nManager, View} from 'react-native';
import {connect} from 'react-redux';
import ReactRestart from 'react-native-restart';
import crashlytics from '@react-native-firebase/crashlytics'

import {changeTab, logEvent} from '../../../analytics';
import {SwitchLabel} from '../../../components/switchlabel';
import styles from './styles';

function SettingsScreen(props) {
  const {isRtl} = props;
  const text = `Change layout(${isRtl ? 'RTL' : 'LTR'})`;

  const toggleSwitch = val => {
    I18nManager.forceRTL(val)
    ReactRestart.Restart()
    logEvent('toggle_switch_layout_settings', {val});
  };

  useEffect(() => {
    changeTab(SettingsScreen.name, SettingsScreen.name);
  }, []);

  return (
    <View style={styles.contentContainer}>
      <SwitchLabel text={text} isEnabled={isRtl} handleChange={toggleSwitch} />
    </View>
  );
}

const mapStateToProps = state => ({
  isRtl: state.settings.isRtl,
});

export default connect(mapStateToProps, null)(SettingsScreen);
