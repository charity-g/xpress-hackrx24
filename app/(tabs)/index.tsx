import { Image, StyleSheet, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScreenButton } from '@/components/ScreenButton';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#ffffff' }}
      headerImage={
        <Image
          source={require('@/assets/images/LogoMotto.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">Let's get started!</ThemedText>
        <ThemedText type="subtitle">Get a personalized recommendation based on your symptoms.</ThemedText>
      </ThemedView>

      <ThemedView style={styles.loginButtons}>
        <ScreenButton href="/new-account" text="Create new account" color='#6BF2E5'/>
        <ScreenButton href="/login" text="Login" bordercolor='#00A79D' color='#ffffff'/>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 80,
  },
  reactLogo: {
    height: 280,
    width: 400,
  }, 
  loginButtons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap:"20px",
    alignContent: 'center'
  }
});
