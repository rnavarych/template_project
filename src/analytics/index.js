import analytics from '@react-native-firebase/analytics';

export async function changeTab(screen_class, screen_name) {
  try {
    await analytics().logScreenView({
      screen_class,
      screen_name,
    });
  } catch (error) {}
}

export async function logEvent(eventName, params = {}) {
  try {
    await analytics().logEvent(eventName, params);
  } catch (error) {}
}

export async function logSignUp(method) {
  try {
    await analytics().logSignUp({method});
  } catch (error) {}
}
