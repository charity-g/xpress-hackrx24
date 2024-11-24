import { StyleSheet, TextInput, Pressable, View, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ScreenButton } from '@/components/ScreenButton';

export default function apptPharm() {
  
  return (
    <ThemedView style={{height: "100%"}}>
    <SafeAreaProvider>
    <SafeAreaView >
    <View  style={styles.titleContainer}>
        <ThemedText type="title" style={{paddingLeft: 20, textAlign: "left"}}>Book your appointment</ThemedText>
        <Image
          source={require('@/assets/images/LogoMotto.png')}
          style={styles.reactLogo}
        />
      </View>
      <View style={{flexDirection: "row", justifyContent: "center", alignContent:"center"}}>
      <Image
          source={require('@/assets/images/medme_img.png')}
          style={styles.imagePage}
        />
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    gap: 8,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reactLogo: {
    height: 120,
    width: 200,
  }, 
  imagePage: {
   height: 620,
   width: 400,
   
  }
   
 });
 
