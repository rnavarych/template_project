import EStyleSheet from 'react-native-extended-stylesheet';

const colors = () => ({
  $whiteGrey: '#f3f4f8',
  $stylishBlue: 'rgb(59,118,239)',
  $warningRed: '#ed4545',
  $greyishGrey: '#b8b9bf',
  $basicTextColor: '#FFF',
});

EStyleSheet.build({
  ...colors(),
});
