import { StyleSheet, View} from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ScreenButton } from '@/components/ScreenButton';
import Ionicons from '@expo/vector-icons/Ionicons';

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
        
        <ThemedText type="title" style={styles.subHeading} >Your Information</ThemedText>
        <View style={styles.rowItem}>
          <Ionicons name='person'></Ionicons>
          <ThemedText type="subtitle">Basic Information</ThemedText>
        </View>
        <View style={styles.rowItem}>
          <Ionicons name='medkit'></Ionicons>
          <ThemedText type="subtitle">Health Background</ThemedText>
        </View>
        <View style={styles.rowItem}>
          <Ionicons name='medkit'></Ionicons>
          <ThemedText type="subtitle">Medications</ThemedText>
        </View>
        <View style={styles.rowItem}>
          <Ionicons name='medkit'></Ionicons>
          <ThemedText type="subtitle">Allergies</ThemedText>
        </View>
        <ThemedText type="title" style={styles.subHeading} >Your Activity</ThemedText>
        <View style={styles.rowItem}>
          <Ionicons name='medkit'></Ionicons>
          <ThemedText type="subtitle">Previous Entries</ThemedText>
        </View>
        <ThemedText type="title"  style={styles.subHeading}>Help with Medication Management</ThemedText>
        <View style={styles.rowItem}>
          <Ionicons name='medkit'></Ionicons>
          <ThemedText type="subtitle">Book an appointment with pharmacist</ThemedText>
        </View>
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
   }, 
   subHeading : {
    textAlign:"center",
    marginBottom: 20,
   },
   rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: "center",
    gap: 20,
   }
});