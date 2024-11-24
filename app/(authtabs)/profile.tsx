import { StyleSheet, View} from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ScreenButton } from '@/components/ScreenButton';

export default function Profile() {
  return (
    
    <ThemedView style={styles.titleContainer}>
    <SafeAreaProvider>
    <SafeAreaView>
      
    <View style={styles.flexContainer}>
      <ThemedText type="title" >Your Profile</ThemedText>
    </View>
      
      <View style={styles.starButton}>
        <ScreenButton  href="/questionaire" text="Start new recommendation"></ScreenButton>
      </View>
      
      <View style={styles.flexContainer}>
        <ThemedText type="title" >Your Information</ThemedText>
        <ThemedText type="subtitle">Basic Information</ThemedText>
        <ThemedText type="subtitle">Health Background</ThemedText>
        <ThemedText type="subtitle">Medications</ThemedText>
        <ThemedText type="subtitle">Allergies</ThemedText>
        <ThemedText type="title" >Your Activity</ThemedText>
        <ThemedText type="subtitle">Previous Entries</ThemedText>
        <ThemedText type="title" >Help with Medication Management</ThemedText>
        <ThemedText type="subtitle">Book an appointment with pharmacist</ThemedText>
      </View>

    </SafeAreaView>
    </SafeAreaProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
   titleContainer: {
     height: "100%",
   },
   subContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
   },
   starButton : {
    margin:  30,
   },
   flexContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
   }
});