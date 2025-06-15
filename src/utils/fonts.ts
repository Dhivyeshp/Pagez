import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Bogart-Regular-Trial': require('../assets/fonts/Bogart-Regular-trial.ttf'),
    'Bogart-Medium': require('../assets/fonts/Bogart-Medium-trial.ttf'),
    'Bogart-Bold-Trial': require('../assets/fonts/Bogart-Bold-trial.ttf'),
    'Bogart-SemiBold': require('../assets/fonts/Bogart-Semibold-trial.ttf'),
    'Bogart-Light': require('../assets/fonts/Bogart-Light-trial.ttf'),
    'Bogart-Thin': require('../assets/fonts/Bogart-Thin-trial.ttf'),
  });
}; 