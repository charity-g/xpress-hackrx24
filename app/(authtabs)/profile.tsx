import { StyleSheet, View} from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ScreenButton } from '@/components/ScreenButton';
import { Icon } from '@rneui/themed';

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
        <View style={styles.rowItem}>
          <Icon name='person'></Icon>
          <ThemedText type="subtitle">Basic Information</ThemedText>
        </View>
        <View style={styles.rowItem}>
          <Icon name='laptop-medical'></Icon>
          <ThemedText type="subtitle">Health Background</ThemedText>
        </View>
        <View style={styles.rowItem}>
          <Icon name='medkit'></Icon>
          <ThemedText type="subtitle">Medications</ThemedText>
        </View>
        <View style={styles.rowItem}>
          <Icon name='pills'></Icon>
          <ThemedText type="subtitle">Allergies</ThemedText>
        </View>
        <ThemedText type="title" >Your Activity</ThemedText>
        <View style={styles.rowItem}>
          <Icon name='file-medical'></Icon>
          <ThemedText type="subtitle">Previous Entries</ThemedText>
        </View>
        <ThemedText type="title" >Help with Medication Management</ThemedText>
        <View style={styles.rowItem}>
          <Icon name='comment-medical'></Icon>
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
   rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
   }
});