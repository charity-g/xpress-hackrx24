import { StyleSheet} from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ScreenButton } from '@/components/ScreenButton';

export default function Profile() {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={{height: 100}}>
         
      <ThemedView style={styles.titleContainer}>
      <ThemedText type="title" >Your Profile</ThemedText>
      <ScreenButton  href="/questionaire" text="Start new recommendation"></ScreenButton>

      </ThemedView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
   titleContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     gap: 8,
   }
});