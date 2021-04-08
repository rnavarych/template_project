import React, {useEffect} from 'react';
import {I18nManager, View} from 'react-native';
import {connect, useSelector, useDispatch} from 'react-redux';
import ReactRestart from 'react-native-restart';
import crashlytics from '@react-native-firebase/crashlytics';
import {changeTab, logEvent} from '../../../analytics';
import {changeTheme} from '../../../actions/changeTheme';
import {SwitchLabel} from '../../../components/switchlabel';
import styles from './styles';
import text from '../../../l18n/locales/en.json';

function SettingsScreen(props) {
  const isDark = useSelector(state => state.changeTheme.isDarkTheme);
  const dispatch = useDispatch();
  const {isRtl} = props;
  const text = text.settings_text.text_rtl.replace(
    /%{value}/,
    `${isRtl ? 'RTL' : 'LTR'}`,
  );
  const textForTheme = text.settings_text.text_theme.replace(
    /%{value}/,
    `${isDark ? 'light' : 'dark'}`,
  );

  const toggleSwitch = val => {
    I18nManager.forceRTL(val);
    ReactRestart.Restart();
    logEvent('toggle_switch_layout_settings', {val});
  };

  const toggleSwitchForTheme = () => {
    const val = isDark ? 'dark mode' : 'light mode';
    dispatch(changeTheme(!isDark));
    logEvent('toggle_switch_theme', {val});
  };

  useEffect(() => {
    changeTab(SettingsScreen.name, SettingsScreen.name);
  }, []);

  return (
    <View style={styles.contentContainer}>
      <SwitchLabel text={text} isEnabled={isRtl} handleChange={toggleSwitch} />
      <SwitchLabel
        text={textForTheme}
        isEnabled={isDark}
        handleChange={toggleSwitchForTheme}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  isRtl: state.settings.isRtl,
});

export default connect(mapStateToProps, null)(SettingsScreen);
