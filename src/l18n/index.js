import {I18nManager} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memorize from 'lodash/memoize';

import en from './locales/en.json';

const translations = {en};

const fallback = 'en';

i18n.translations = translations;
i18n.defaultLocale = fallback;
i18n.fallbacks = true;

I18nManager.allowRTL(true);

const translate = memorize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

translate.cache.clear();

const getDeviceSuitableLang = () => {
  const lang = RNLocalize.findBestAvailableLanguage(Object.keys(translations));
  if (lang) {
    return lang.languageTag;
  }
  return null;
};

const getLangToDisplay = () => getDeviceSuitableLang() || fallback;

let currentLang = getLangToDisplay();

export function strings(name, params) {
  const previousLang = currentLang;
  currentLang = getLangToDisplay();
  if (previousLang !== currentLang) {
    translate.cache.clear();
  }
  i18n.locale = currentLang;
  const result = translate(name, params);
  return result;
}

export default i18n;
