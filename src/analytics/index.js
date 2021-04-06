import analytics from '@react-native-firebase/analytics';

export async function changeTab(screen_class, screen_name) {
  await analytics().logScreenView({
      screen_class,
      screen_name
  });
}

export async function logEvent(eventName, params = {}) {
  await analytics().logEvent(eventName, params);
}

export async function logSignUp(method) {
  await analytics().logSignUp({method});
}
